import React from 'react';
import Action from "./Action";
import AddOption from "./AddOption";
import Header from "./Header";
import Options from "./Options";
import OptionModal from "./OptionModal";


export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    clearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    handlePick = () => {
        const random = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[random];

        this.setState(() => ({ selectedOption: option }))
    }

    handleRemoveAll = () => {
        this.setState(() => ({ options: [] }))
    }

    handleAddOption = (option) => {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    };


    handleDeleteOption = (optionToDelete) => {

        this.setState((prevState) => {
            return {
                options: prevState.options.filter((option) => optionToDelete !== option)
            }
        })
    }


    componentDidMount() {
        const json = localStorage.getItem("options");
        const options = JSON.parse(json);
        this.setState(() => ({ options }))
    }

    componentDidUpdate() {
        const json = JSON.stringify(this.state.options)
        localStorage.setItem("options", json);
    }

    render() {
        const subtitle = "This app will decide things for you";
        return (
            <div>
                <Header subtitle={subtitle} />
                
                <div className="container">
                    <Action
                        handlePick={this.handlePick}
                        hasOptions={this.state.options.length > 0}
                    />
                    <div className = "widget">
                    <Options
                        options={this.state.options}
                        handleDeleteOption={this.handleDeleteOption}
                        handleRemoveAll={this.handleRemoveAll}
                        hasOptions={this.state.options.length > 0}
                    />
                    <AddOption
                        handleAddOption={this.handleAddOption}
                    />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    clearSelectedOption={this.clearSelectedOption}
                />

            </div>
        )
    }
}