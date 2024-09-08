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
        model: 'zappy',
        quantity: 1
    });
    const [showQueueButton, setShowQueueButton] = useState(false);
    const [inputFields, setInputFields] = useState([{ id: 1 }]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isActive, setIsActive] = useState(false);

    const [submitError, setSubmitError] = useState('');

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

    const handleSliderChange = (event, newValue) => {
        setFormData((prevData) => ({
          ...prevData,
          quantity: newValue,
        }));
      };

    const handleInputChange = (event, index, type) => {
        const { value } = event.target;
        setFormData(prevData => {
            // Ensure type is either 'prompts' or 'styles'
            if (type === 'prompts' || type === 'styles') {
                const updatedArray = [...prevData[type]];  // Correctly access prompts or styles array
                updatedArray[index] = value;  // Update the correct index with the new value

                return {
                    ...prevData,
                    [type]: updatedArray  // Update the corresponding array in formData
                };
            }
            return prevData;  // In case type is not valid, return the unchanged state
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (validateForm()) {

            try {
                const response = await fetch('http://127.0.0.1:8000/produce ', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    // Backend responded with an error
                    const errorData = await response.json();
                    setSubmitError(`Error: ${errorData.message || 'Fetching failed'}`);
                } else {
                    // Successful submission
                    setSubmitError('');
                    console.log('Form Data:', formData);
                    
                    const resultData = await response.json();
                    console.log(resultData);

                    navigate('/result', { state: { formData, resultData } });

                    setIsLoading(false);
                }

            } catch (err) {
                // Handle network or other errors
                setSubmitError(`Error: ${err.message || 'An unexpected error occurred'}`);
            }

        }


    };


    const validateForm = () => {
        const hasEmptyPrompt = formData.prompts.some(prompt => prompt.trim() === '');

        if (hasEmptyPrompt) {
            setError('Please fill in the prompt fields.');

            return false;
        }

        setError('');
        return true;
    };

    console.log(formData)
    
    const sliderStyles = {
        '& .MuiSlider-markLabel': {
          color: 'white', // Change the color of the label text
          fontSize: '15px', // Set the font size of the label
          fontWeight: 'bold', // Set the font weight of the label
        },
        
      };

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
                    <button className='button2' value='queue' onClick={onActive} disabled>Queue Generation</button>
                </div>
            </div>
            <div className='subdiv'>
                <h3>Number of Production</h3>
                <Box sx={{ width: 724 }}>
                    <Slider
                        aria-label="Custom marks"
                        defaultValue={1}
                        getAriaValueText={valuetext}
                        min={1}
                        max={10}
                        step={1}
                        marks={marks}
                        valueLabelDisplay="auto"
                        color="white"
                        onChange={handleSliderChange}
                        sx={sliderStyles}
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
                <button className='button1' onClick={handleSubmit}>{isLoading ? 'Loading...' : 'Generate'}</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>

    )
}

export default Home