
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import { Button, CircularProgress } from '@mui/material';

import axios from 'axios';
import moment from "moment";
import 'moment/min/locales';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

let cancelAxiosRequest = false;
moment.locale('ar');


export default function Main() {

    const { t, i18n } = useTranslation();
    // const localeState = useRef("ar");
    const [localeState, setLocaleState] = useState("ar");
    const Direction = localeState === 'ar' ? "rtl" : "ltr";

    // console.log(t("medo"));

    const [weatherInfo, setWeatherInfo] = useState({
        temp: <CircularProgress variant="indeterminate" thickness={5} size={40} sx={{ color: 'white' }} />,
        description: <CircularProgress variant="indeterminate" thickness={5} size={40} sx={{ color: 'white' }} />,
        icon: <CircularProgress variant="indeterminate" thickness={5} size={40} sx={{ color: 'white' }} />,
        maxTemp: <CircularProgress variant="indeterminate" thickness={5} size={40} sx={{ color: 'white' }} />,
        minTemp: <CircularProgress variant="indeterminate" thickness={5} size={40} sx={{ color: 'white' }} />,
    });

    const [dateAndTime, setDateAndTime] = useState("");

    function handelLanguage() {
        if (localeState === "ar") {
            moment.locale('en');
            i18n.changeLanguage("en");
            setLocaleState('en');
        } else {
            moment.locale('ar');
            i18n.changeLanguage("ar");
            setLocaleState('ar');
        }
        setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
        // console.log(localeState)
    }

    useEffect(() => {
        setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));


        axios.get("https://api.openweathermap.org/data/2.5/weather?lat=27.1&lon=31.0&appid=30a5ffe67b7ec46b914c3b0405c94c12", {
            cancelToken: new axios.CancelToken((e) => {
                // console.log(e);
                cancelAxiosRequest = e;
            })
        })
            .then(res => {
                // console.log(res);
                setWeatherInfo({
                    temp: Math.round(res.data.main.temp - 273.15),
                    description: res.data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`,
                    maxTemp: Math.round(res.data.main.temp_max - 273.15),
                    minTemp: Math.round(res.data.main.temp_min - 273.15),
                })
            }).catch(e => {
                console.log(e);
            })
        return () => cancelAxiosRequest();
    }, [])

    return (
        <div className="MainContainer">
            <Container maxWidth="sm" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <Card sx={{
                    minWidth: "100%",
                    padding: 2,
                    direction: Direction,
                    backgroundColor: "rgb(0 0 0 / 30%)",
                    boxShadow: "4px 4px 10px 0.5px rgb(0 0 0 / 30%)",
                    color: "white !important"
                }}>
                    {/* Title */}
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}>
                        <Typography variant="h2" gutterBottom sx={{ margin: "0 0 0 10px" }}>
                            {t("assuit")}
                        </Typography>
                        <Typography variant="h5" gutterBottom >
                            {dateAndTime}
                        </Typography>

                    </div>
                    {/*== Title == */}
                    <hr />
                    {/* Info Body */}
                    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
                        {/* rigth info */}
                        <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
                            <div style={{ display: "flex", justifyContent: "space evenly", alignItems: "center" }}>
                                <Typography variant="h2" gutterBottom sx={{ margin: "0" }}>
                                    {weatherInfo.temp}
                                </Typography>
                                <img src={weatherInfo.icon} alt='' />
                            </div>
                            <Typography variant="h6" gutterBottom >
                                {t(weatherInfo.description)}
                            </Typography>
                            <div style={{ display: "flex" }}>
                                <Typography variant="h6" gutterBottom style={{ display: "flex" }}>
                                    {t("min")} :{weatherInfo.minTemp}
                                </Typography>
                                <Typography variant="h6" gutterBottom style={{ display: "flex", margin: "0 5px 0 5px" }}>
                                    |
                                </Typography>
                                <Typography variant="h6" gutterBottom style={{ display: "flex" }}>
                                    {t("max")}  :{weatherInfo.maxTemp}
                                </Typography>
                            </div>
                        </div>
                        {/* == rigth info == */}
                        {/* left info */}
                        <div style={{ width: "60%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CloudIcon style={{ display: "block", width: "80%", height: '80%' }} />
                        </div>
                        {/* == left info == */}
                    </div>
                    {/* == Info Body == */}
                </Card>
                {/* BUTTON LANGUAGE */}
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-start", marginTop: "10px", direction : Direction }}>
                    <Button variant="text" style={{ color: "white" }} onClick={handelLanguage}>
                        {localeState === "ar" ? "الإنجليزية" : "Arabic"}
                    </Button>
                </div>
                {/* == BUTTON LANGUAGE == */}
            </Container>
        </div>
    );
}