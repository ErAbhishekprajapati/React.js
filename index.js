import React from 'react';
import ReactDOM from 'react-dom/client';
//import Sample from './Classcomponents/Sample';
import SampleF from './FunctionComponents/SampleF';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
//import { render } from '@testing-library/react';


//import './index.css';
//import App from './App';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <> 
  {/* <h1>Abhishek Prajapati</h1> */}
   <SampleF/>
  </>
 
 )
 
  

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


/*class Car extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "indian",
      model: "Mustang",
      color: "red",
      year: 1949
    };
  }
  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Car />);
*/






