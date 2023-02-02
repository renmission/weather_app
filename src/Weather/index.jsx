import React, { PureComponent, createRef } from 'react';
import WeatherForm from './WeatherForm';
import WeatherList from './WeatherList';
import WeatherBtn from './WeatherBtn';

export default class Weather extends PureComponent {
  render() {
    return (
      <div className="flex flex-col items-center h-creen py-16">
        <h1 className="text-4xl font-bold">Weather App</h1>
        <WeatherForm />
        <div className="flex py-8">
          <WeatherList />
        </div>
        <WeatherBtn />
      </div>
    );
  }
}
