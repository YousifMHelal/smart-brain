import React from 'react';
import { Button, Form } from 'react-bootstrap';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            failed: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    onSubmitSignIn = () => {
        fetch('https://smartbrainapi-8jke.onrender.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
                else{
                    this.setState({failed: 'Invalid email address or password'})
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <div className='d-flex justify-content-center p-3 ' >
                <Form onSubmit={(event) => event.preventDefault()} className='text-center shadow-lg px-5 py-5 rounded-3 ' style={{ width: '400px' }}>
                    <h1>Sign in</h1>
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
                    <Button variant="dark" type="submit" onClick={this.onSubmitSignIn} value="Sign in">
                        Sign in
                    </Button>
                    <Form.Text className="d-block text-dark fs-6" role="button" onClick={() => onRouteChange('register')}>
                        Register
                    </Form.Text>
                    <p className='text-danger'>{this.state.failed}</p>
                </Form>
            </div>

        )
    }

}

export default Signin