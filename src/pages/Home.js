import React, { useState } from 'react'
import "./Home.css"
import ArtaistLogo from "../assets/logo/artaist_business_logo.svg"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
    {
        value: 1,
        label: 1,
    },
    {
        value: 5,
        label: 5,
    },
    {
        value: 10,
        label: 10,
    }
];

function valuetext(value) {
    return `${value}°C`;
}

const Home = () => {
    const [form, setForm] = useState({
        prompt: '',
        style: '',
        uid: 'irmakege',
        model: ''
    });

    const onClick = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value  // Dynamically update input field values
        });

    };

    // Handle input changes (onChange)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value  // Dynamically update input field values
        });
    };

    console.log(form)


    return (

        <div className="maindiv">
            <div className="imgsubdiv">
                <img src={ArtaistLogo} alt="ArtaistLogo" />
            </div>
            <div className='subdiv'>
                <h3>AI Model</h3>
                <div className='buttonsubdiv'>
                    <button className='button2' name='model' value='zappy' onClick={onClick}>Zappy</button>
                    <button className='button2' name='model' value='masterpiece' onClick={onClick}>Masterpiece</button>
                </div>
            </div>
            <div className='subdiv'>
                <h3>Production Type</h3>
                <div className='buttonsubdiv'>
                    <button className='button2'>Bulk Generation</button>
                    <button className='button2'>Queue Generation</button>
                </div>
            </div>
            <div className='subdiv'>
                <h3>Number of Production</h3>
                <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Always visible"
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        min={1}
                        max={10}
                        step={1}
                        marks={marks}
                        valueLabelDisplay="on"
                        color="white"
                    />
                </Box>
            </div>
            <div className='subdiv'>
                <h3>Prompt Area</h3>
                <input className="inputfield1" type="text" id="prompt" name="prompt" value={form.prompt} placeholder='A cute rabbit, white background, pastel hues, minimal illustration, line art, pen drawing' onChange={handleInputChange} />
                <input className="inputfield2" type="text" id="style" name="style" value={form.style} placeholder='Style (optional)' onChange={handleInputChange} />
            </div>
            <div className='subdiv'>
                <button className='button1'>Generate</button>
            </div>
        </div>

    )
}

export default Home