import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import {render, fireEvent} from '@testing-library/react'

import App from '../App'


test('Create a Shape when + Shape btn is clicked', () => {
    const shapeMsg = 'Shape';
    const tripleBtn = '+ Triple';
    const shapeBtn='+ Shape';
    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )

    expect(queryByText(shapeMsg)).toBeNull();
    expect(queryByText(tripleBtn)).toBeNull();
    fireEvent.click(getByText(shapeBtn));
    expect(getByText(shapeMsg)).toBeInTheDocument();
    expect(getByText(tripleBtn)).toBeInTheDocument();
    expect(getByText(shapeBtn)).toBeInTheDocument();
})


test('Expand Qualifier', () => {
    const shapeBtn='+ Shape';
    const qualifier = 'qualiColapse';
    const qualifierBtn = 'expand_more';
    const className = 'collapsing';

    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )
    
    //Create a Shape
    fireEvent.click(getByText(shapeBtn))

    expect(document.getElementById(qualifier)).not.toHaveClass(className);
    fireEvent.click(getByText(qualifierBtn));
    expect(document.getElementById(qualifier)).toHaveClass(className);
})


test('Create a Triple when + Triple btn is clicked', () => {
    const shapeMsg = 'Shape';
    const tripleMsg = 'Triple';
    const tripleBtn = '+ Triple';
    const shapeBtn='+ Shape';
    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )

    //Create a Shape
    fireEvent.click(getByText(shapeBtn))

    expect(queryByText(tripleMsg)).toBeNull();
    fireEvent.click(getByText(tripleBtn));
    expect(getByText(tripleMsg)).toBeInTheDocument();  

})


test('Expand Value', () => {
    const shapeBtn='+ Shape';
    const tripleBtn = '+ Triple';
    const expandBtn = 'collapseValueBtn';
    const values = 'collapseValue';
    const className = 'collapsing';

    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )
    
    //Create a Shape
    fireEvent.click(getByText(shapeBtn))
    //Create a Triple
    fireEvent.click(getByText(tripleBtn));

    expect(document.getElementById(values)).not.toHaveClass(className);
    fireEvent.click(document.getElementById(expandBtn));
    expect(document.getElementById(values)).toHaveClass(className);
})


test('Expand Assistant', () => {
    const assistantBtn='Assistant';
    const assistant = 'assistantCollapse'
    const className = 'collapsing';

    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )
    
    expect(document.getElementById(assistant)).not.toHaveClass(className);
    fireEvent.click(getByText(assistantBtn));
    expect(document.getElementById(assistant)).toHaveClass(className);
})

test('Expand Visualize', () => {
    const visualizeBtn='Visualize';
    const visualize = 'visualizeCollapse'
    const className = 'collapsing';

    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )
    
    expect(document.getElementById(visualize)).not.toHaveClass(className);
    fireEvent.click(getByText(visualizeBtn));
    expect(document.getElementById(visualize)).toHaveClass(className);
})



test('Clear All', () => {
    const shapeMsg = 'Shape';
    const tripleMsg = 'Triple';
    const shapeBtn='+ Shape';
    const tripleBtn = '+ Triple';
    const clearBtn = 'clearAll'


    const {queryByText, getByLabelText, getByText} = render(
        <App></App>,
    )
    
    //Create a Shape
    fireEvent.click(getByText(shapeBtn))
    //Create Triples
    fireEvent.click(getByText(tripleBtn));
    fireEvent.click(getByText(tripleBtn));
    fireEvent.click(getByText(tripleBtn));

    
    fireEvent.click(document.getElementById(clearBtn));
    expect(queryByText(shapeMsg)).toBeNull();
    expect(queryByText(tripleMsg)).toBeNull();
    expect(queryByText(tripleBtn)).toBeNull();
    expect(getByText(shapeBtn)).toBeInTheDocument();
})