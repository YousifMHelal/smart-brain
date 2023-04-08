import React from 'react'
import { Button, Form } from 'react-bootstrap'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value })
    }

    onNameChange = (e) => {
        this.setState({ name: e.target.value })
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://smartbrainapi-8jke.onrender.com/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('signin');
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='d-flex justify-content-center p-3 ' >
                <Form onSubmit={(event) => event.preventDefault()} className='text-center shadow px-5 py-5 rounded-3 ' style={{ width: '400px' }}>
                    <h1>Register</h1>
                    <Form.Group className="my-3 " controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                        className='bg-transparent' 
                        type="name" 
                        placeholder="Your name"
                        onChange={this.onNameChange}
                        />
                    </Form.Group>

                    <Form.Group className="my-3 " controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        className='bg-transparent' 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={this.onEmailChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        className='bg-transparent' 
                        type="password" 
                        placeholder="Password" 
                        onChange={this.onPasswordChange}
                        />  
                    </Form.Group>
                    <Button variant="dark" type="submit" onClick={this.onSubmitSignIn}>
                        Register
                    </Button>
                    <Form.Text className="d-block text-dark fs-6" role="button" onClick={() => onRouteChange('signin')}>
                        Or sign in
                    </Form.Text>
                </Form>
            </div>

        )
    }
}

export default Register