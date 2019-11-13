import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import AssistantComp from './components/AssistantComp';
import VisualizeComp from  './components/VisualizeComp';

import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';




export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);

    const assistanToggle = () => setAssistantOpen(!isAssistantOpen);
    const visualizeToggle = () => setVisualizeOpen(!isVisualizeOpen);

     const darkStyle = {
        background: '#2B2B2B',
        color:'white'
    }

    const lightStyle = {
        background: '#eaf3ff',
        color:'black'
    }

    const [style,setStyle] = useState(lightStyle);
    let theme = 'light';

    const addShape = () =>{
      setShapes([...shapes,shexUtils.addShape(shapes)]);
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId,false));
    }

    const emit = ()=>{
      //shexUtils.emit(shapes);
      //visualize();
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      setShapes([]); 
      setShapes(newShapes);
      //visualize();
    }

    const updatePrefixes = (newPrefixes)=>{
      setPrefixes(newPrefixes);
    }
    
    const changeThemeStyle = () =>{
      if(theme=='light'){//I don't know why this doesn't work with style state
        setStyle(darkStyle);
        theme='dark';
      }else{
        theme='light';
        setStyle(lightStyle);
      }
    }

   



    return (
            
            <ShapesContext.Provider 
                value={
                  {
                    shapes,shapes,
                    addShape:addShape,
                    deleteShape:deleteShape,
                    replaceShapes:replaceShapes,
                    prefixes:prefixes,
                    updatePrefixes:updatePrefixes,
                    emit:emit,
                    currentStyle:style,
                    changeThemeStyle:changeThemeStyle,
                  }
                }>
                
                
                <Nav  assistanToggle={assistanToggle} 
                      visualizeToggle={visualizeToggle}/>
                <div className="row colseparator " style={style}> 
                    
                    <Collapse id='assistantCollapse' isOpen={isAssistantOpen} className="assistant col" style={style}>
                        <AssistantComp/>
                     </Collapse> 
                             
                </div>
                <Collapse id='visualizeCollapse' isOpen={isVisualizeOpen} >
                  <VisualizeComp/>
                </Collapse> 
            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
