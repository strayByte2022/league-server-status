'use client'
import { RIOT_DEV_KEY } from '@/components/constant/DevKey'
import { Button, Card, Input, TextField, Typography } from '@mui/material'
import { Result } from 'postcss'
import React, { useEffect, useState } from 'react'
const regions = [
  {
    label: 'BR1',
    value: 'BR1'
  },

  {
    label: 'EUN1',
    value: 'EUN1'
  },

  {
    label: 'EUW1',
    value: 'EUW1'
  },

  {
    label: 'JP1',
    value: 'JP1'
  },

  {
    label: 'KR',
    value: 'KR'
  },
  {
    label: 'LA1',
    value: 'LA1'
  },
  {
    label: 'LA2',
    value: 'LA2'
  },
  {
    label: 'NA1',
    value: 'NA1'
  },
  {
    label: 'OC1',
    value: 'OC1'
  },
  {
    label: 'PBE1',
    value: 'PBE1'
  },
  {
    label: 'PH2',
    value: 'PH2'
  },
  {
    label: 'RU',
    value: 'RU'
  },
  {
    label: 'SG2',
    value: 'SG2'
  },
  {
    label: 'TH2',
    value: 'TH2'
  },
  {
    label: 'TR1',
    value: 'TR1'
  },
  {
    label: 'VN2',
    value: 'VN2'
  },

]
const MainPage = () => {
  const [region, setRegion] = useState("BR1")
  const [response, setResponse] = useState()
  const [maintainance, setMaintainance] = useState(true)
  const key = RIOT_DEV_KEY;


  const getServerStatus = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Accept-Language", "en-US,en;q=0.9");
    myHeaders.append("Accept-Charset", "application/x-www-form-urlencoded; charset=UTF-8");
    myHeaders.append("Origin", "https://developer.riotgames.com");

    var requestOptions: Object = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    try {
      const response = await fetch(`https://${region}.api.riotgames.com/lol/status/v4/platform-data?api_key=${key}`, requestOptions);
      const result = await response.text();

      // Parse the JSON string into a JavaScript object
      const data = JSON.parse(result);

      // Now you can access each value from the object
      console.log(data); // This will log the entire object


      // If you want to set the entire JSON object as the response state
      setResponse(data.name);
      if (data.maintainances.length === 0) { setMaintainance(false) }
      // If you want to set specific values as the response state
      // setResponse({
      //   services: data.services,
      //   status: data.status
      // });
    } catch (error) {
      console.log('error', error);
    }

  }


  return (
    <div className='p-3 grid gap-4'>
      <Typography className="text-xl font-bold">CHECK LEAGUE OF LEGENDS SERVER STATUS - ALL SERVER!</Typography>
      <Typography>Choose your region</Typography>
      <TextField
        id='select-region'
        select
        SelectProps={{
          native: true,
        }}
        onChange={(e) => { setRegion(e.target.value.toLowerCase()) }}
      >
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.label}
          </option>
        ))}
      </TextField>

      <Button onClick={getServerStatus} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Check Status!
      </Button>

      <Card className="p-4 bg-gray-100 rounded">
        <Typography className="font-bold">Server Name: {response}</Typography>
        <Typography className="font-bold">Status: {maintainance?"Server is working properly" : "Server is down"}</Typography>
      </Card>
    </div>
  )
}

export default MainPage