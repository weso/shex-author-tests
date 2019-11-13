import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';
import Qualifier from './utils/Qualifier';

import Triple from '../../entities/shexEntities/triple';

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);
     const [colapseBtn,setColapseBtn] = useState('expand_less');
     const [isTriplesOpen, setTriplesOpen] = useState(true);
     const [isQualiOpen, setQualiOpen] = useState(false);

    const handleChange = ()=>{
        const id = shape.getTriplesCount();
        const triple = new Triple(id);
        
        setTriples([...triples,triple]);

        shape.addTriple(triple);
        context.emit();
        
    }

    const handleTriplesColapse = ()=>{
            if(colapseBtn=='expand_more'){
                setColapseBtn('expand_less');
            }else{
                setColapseBtn('expand_more');
            }
           setTriplesOpen(!isTriplesOpen);
    }


    const handleQualiCollapse = ()=>{
        setQualiOpen(!isQualiOpen);
    }

    const deleteTriple = (tripleId)=>{
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples);
        shape.setTriples(newTriples);
        context.emit();
    }


    return (
        <div className="shapes-container" style={context.currentStyle}>
                     
                <div className="row shapes-header" style={context.currentStyle}>
                    <label className="col-sm-2">Shape </label>
                    <ShapeTypeComp shape={shape} collapse={handleQualiCollapse}/>
                
                </div>
        
                <Collapse id='qualiColapse' isOpen={isQualiOpen}  timeout={110}>
                    <div className="row qualifier" style={context.currentStyle}>
                            <label id='quali' className="col-2 qualiLabel">Qualifier</label>
                            <div className="col-2">
                                <Qualifier shape={shape} scope='shape'/>
                            </div>
                    </div>
                </Collapse>
           

         
                <button className="col-xs-1  colapseTriplesBtn mdc-icon-button material-icons btn-primary"
                        onClick={()=>handleTriplesColapse()}>
                        {colapseBtn}
                </button>
                

                <Collapse isOpen={isTriplesOpen} style={context.currentStyle}>
                    <div className="triples-container col-xs "style={context.currentStyle}>
                            {triples.map(triple =>

                                <TripleComponent key={triple.id}
                                                shape={shape} 
                                                triple={triple}
                                                deleteTriple={deleteTriple}
                                /> 
                                    
                            )}
                    </div>

                    <button className="btn-primary addPropButton col-xs-3"
                            onClick={handleChange}>
                            + Triple
                    </button>
                
                </Collapse>
                
            </div>
     
    );
                                   
    
}


export default ShapeComponent;

