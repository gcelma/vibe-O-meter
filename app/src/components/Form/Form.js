import React, { Component } from 'react';

class Form extends Component {
    
    state = { 
        name: null,
        username: null, 
        email: null, 
        password: null, 
        passwordConfirmation: null,
        passwordNotMatch: false 
    };

    handleInput = event => {
        this.setState({[event.target.name] : event.target.value})
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.setState({passwordNotMatch : false})
        const { password, passwordConfirmation } = this.state;

        if (password && passwordConfirmation) {
            if (password !== passwordConfirmation) {
                return this.setState({passwordNotMatch : true})
            }
        }
        
        this.props.handleFormSubmit(this.state);
    }

    render() {
        const { handleFormSubmit, handleInput } = this;
        const { name, username, email, password, passwordConfirmation, actionButtonText } = this.props;
        const { passwordNotMatch } = this.state;

        return <div className="form">
            <form className="registerForm" onSubmit={handleFormSubmit}>
                {name && <input type="text" name="name" onChange={handleInput} placeholder="name" />}   
                {username && <input type="text" name="username" onChange={handleInput} placeholder="username" />}
                {email && <input type="text" name="email" onChange={handleInput} placeholder="email" />}
                {password && <input type="password" name="password" onChange={handleInput} placeholder="password" />}
                {passwordConfirmation && <input type="password" name="passwordConfirmation" onChange={handleInput} placeholder="confirm password" />}
                {actionButtonText? <button>{actionButtonText}</button> : <button>GO!</button>}                
            </form>
            {passwordNotMatch && <p>password not matching, please try again</p>}
        </div>
    }
}

export default Form;