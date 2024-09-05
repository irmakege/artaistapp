import React, { useState } from 'react'
import "./Home.css"
import ArtaistLogo from "../assets/logo/artaist_business_logo.svg"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useNavigate } from 'react-router-dom';

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
    const [formData, setFormData] = useState({
        prompts: [''],
        styles: [''],
        uid: 'irmakege',
        model: ''
    });
    const [showQueueButton, setShowQueueButton] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: 1 }]);

    const navigate = useNavigate();

    const onClick = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value  // Dynamically update input field values
        });
    };

    const onActive = (e) => {
        const { value } = e.target;

        if (value === 'queue') {
            setShowQueueButton(true)
        } else {
            setShowQueueButton(false)
        }

    };

    const handleInputChange = (event, index, type) => {
        const { value } = event.target;
        setFormData(prevData => {
            const updatedArray = [...prevData[type]];
            updatedArray[index] = value;
            return {
                ...prevData,
                [type]: updatedArray
            };
        });

    };

    const addInputFields = () => {
        setInputFields([...inputFields, { id: inputFields.length + 1 }]);
        setFormData(prevData => ({
            ...prevData,
            prompts: [...prevData.prompts, ''],
            styles: [...prevData.styles, '']
        }));
    };

    // Handle form submission and redirect
    const handleSubmit = (e) => {
        e.preventDefault();
        // Navigate to the result page, passing form data through state
        navigate('/result', { state: { formData } });
    };

    console.log(formData)


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
                    <button className='button2' value='bulk' onClick={onActive}>Bulk Generation</button>
                    <button className='button2' value='queue' onClick={onActive}>Queue Generation</button>
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
                {inputFields.map((field, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="prompt"
                            placeholder={`Prompt ${field.id}`}
                            value={formData.prompts[index] || ''}
                            onChange={(e) => handleInputChange(e, index, 'prompts')}
                            className='inputfield1'
                        />
                        <input
                            type="text"
                            name="style"
                            placeholder={`Style ${field.id}`}
                            value={formData.styles[index] || ''}
                            onChange={(e) => handleInputChange(e, index, 'styles')}
                            className='inputfield2'
                        />
                    </div>
                ))}
                {
                    showQueueButton ? (
                        <button className='button3' onClick={addInputFields}>+Add Prompt to Queue</button>
                    ) : (
                        <div></div>
                    )
                }
            </div>
            <div className='subdiv'>
                <button className='button1' onClick={handleSubmit}>Generate</button>
            </div>
        </div>

    )
}

export default Home