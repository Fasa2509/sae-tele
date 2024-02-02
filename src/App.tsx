import { useEffect, useRef, useState } from 'react'
import { Box, ThemeProvider, Typography } from '@mui/material'
import { lightTheme } from './utils/MaterialConfig'
import { LineChart } from '@mui/x-charts'
import { getTemperatures } from './utils/Fetcher'
import './App.css'

function App() {
  const [graphicWidth, setGraphicWidth] = useState(0);
  const [max, setMax] = useState(0);
  const [avg, setAvg] = useState({
    abs: 0,
    rel: 0,
  });
  const [yData, setYData] = useState<Array<number>>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const xData = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const allData = useRef<number[]>([]);

  /*
  useEffect(() => {
    setInterval(() => {
      let num = Number((Math.random() * 10).toFixed(2));
      setYData((prevState) => [...prevState, num].slice(-21));

      allData.current.push(num);

      setMax(Math.max(...allData.current));
      setAvg(allData.current.reduce((prev, curr) => prev + Number(curr.toFixed(2))));
    }, 1000);
  }, []);
  */

  useEffect(() => {
    setInterval(() => {
      (async () => {
        const res = await getTemperatures();

        if (res.error) return console.log(res);

        let num = res.payload.celsius;

        setYData((prevState) => [...prevState, num].slice(-21));

        allData.current.push(num);

        setMax(Math.max(...allData.current));
        setAvg(() => ({
          abs: allData.current.reduce((prev, curr) => prev + Number(curr.toFixed(2))),
          rel: allData.current.slice(-20).reduce((prev, curr) => prev + Number(curr.toFixed(2))),
        }));
      })();
    }, 1000);
  }, []);

  useEffect(() => {
    const width = Number(window.getComputedStyle(document.getElementById("graphic-container")!).width.slice(0, -2));
    setGraphicWidth((width > 600) ? 600 : width);
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <Box display="flex" flexDirection="column" rowGap="1rem" justifyContent="center">
        <div>
          <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "500", textAlign: "center" }}>SAE - Telemetría</Typography>
          <Typography variant="h1" sx={{ fontSize: "1.5rem", fontWeight: "400", textAlign: "center" }}>Equipo #01</Typography>
        </div>
        <Box>
          <Typography className="info">T {"("}°C{")"} vs t {"("}s{")"}</Typography>
          <Typography className="info">Últimos 20 segundos</Typography>
          <section id="graphic-container" className="fadeIn">
            <div>
              <LineChart
                title='Temeratura °C'

                xAxis={[{ data: xData }]}
                series={[{ data: yData }]}
                width={graphicWidth}
                height={graphicWidth * 3 / 5}
              />
            </div>
            <aside className="data-container">
              <Typography>Últimos datos en tiempo real</Typography>
              <Typography>°C: {(yData[yData.length - 1] || 0).toFixed(2)}</Typography>
              <Typography>K: {((yData[yData.length - 1] || 0) + 273.15).toFixed(2)}</Typography>
            </aside>
          </section>
        </Box>
        <Typography className="p">Mayor temperatura: {max.toFixed(2)}°C</Typography>
        <Typography className="p">Promedio de las últimas 20 temperaturas: {Number(avg.rel / ((allData.current.length > 20) ? 20 : (allData.current.length || 1))).toFixed(2)}°C</Typography>
        <Typography className="p">Promedio de todas las temperaturas: {Number(avg.abs / (allData.current.length || 1)).toFixed(2)}°C</Typography>
      </Box>
    </ThemeProvider>
  )
}

export default App
