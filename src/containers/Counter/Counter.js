import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 10" clicked={this.props.onSubtractCounter}  />
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResult.map(sr => (
                        <li key={sr.id} onClick={() => this.props.onDeleteResult(sr.id)}>{sr.value}</li>
                    ))}
                    
                </ul>
            </div>
        );
    }
}
// this has to be after the component function and before the export call.
// this maps the values in store to local variables to be used here. counter is defined in 
// the store/reducer.js file.
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        storedResult: state.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onAddCounter: () => dispatch({type: 'ADD', val:10}),
        onSubtractCounter: () => dispatch({type: 'SUBTRACT', val: 5}),
        onStoreResult: (result) => dispatch({type: 'STORE_RESULT', result: result}),
        onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultEleId: id })
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Counter);