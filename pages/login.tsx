import React, {Component} from 'react';
import {Button, Input, Container, ImgEye, Loading} from '@components/login/loginContainer';
import {LoginState} from "../types/account";
import {Api} from "../services/api";

export default class extends Component<{}, LoginState> {
    public static title: string = "login";

    public state = {
        isHidden: true,
        imgSrc: 'icons8-eye-60.png',
        login: {
            name: "",
            password: ""
        },
        loadingDisplay: "none",
    }

    componentDidMount() {
        document.cookie = "authorization=";
    }

    private changeName = (e) => {
        const newName = e.target.value;
        const oldPassword = this.state.login.password;

        this.setState({login: {name: newName, password: oldPassword}});
    };

    private changePassword = (e) => {
        const oldName = this.state.login.name;
        const newPassword = e.target.value;

        this.setState({login: {name: oldName, password: newPassword}});
    };

    private auth = async () => {
        this.setState({loadingDisplay: "block"})
        const api = new Api();
        await api.login(this.state.login);
    }


    private changeHide = () => {
        const newHidden = !this.state.isHidden;
        this.setState({isHidden: newHidden});
        if (newHidden) {
            this.setState({imgSrc: 'icons8-eye-60.png'});
        } else {
            this.setState({imgSrc: 'icons8-hide-60.png'});
        }
    };

    render() {
        return (
            <>
                <Container>
                    User:
                    <Input type="text" onChange={this.changeName}/>
                    Password:
                    <Input type={this.state.isHidden ? 'password' : 'text'} onChange={this.changePassword}/>
                    <ImgEye src={this.state.isHidden ? '/icons8-hide-60.png' : '/icons8-eye-60.png'}
                            onClick={this.changeHide} alt='Eye'/>
                    <br/>
                    <Button onClick={this.auth}>Authenticate</Button>
                    <br/>
                    <br/>
                </Container>

                <Loading className="sk-chase" style={{display: this.state.loadingDisplay}}>
                    <Loading className="sk-chase-dot"/>
                    <Loading className="sk-chase-dot"/>
                    <Loading className="sk-chase-dot"/>
                    <Loading className="sk-chase-dot"/>
                    <Loading className="sk-chase-dot"/>
                    <Loading className="sk-chase-dot"/>
                </Loading>
            </>
        );
    }
}