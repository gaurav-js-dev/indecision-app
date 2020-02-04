import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from './AddOption';
import OptionModal from "./OptionModal"

export default class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOptions: undefined
    };

    componentDidMount() {
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        }
        catch (e) {
            // Do nothing
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) =>
                // return all the items which are not equal to optionToRemove
                optionToRemove !== option)
        }));
    };

    clearSelectedOption = () => {
        this.setState(() => ({ selectedOptions: "" }))
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    };

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOptions: option }));
    }

    handleAddOption = (option) => {
        if (!option) {
            return "Enter a valid input to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists"
        }
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));

    }
    render() {
        const title = "Indecision";
        const subtitle = "Put your life in hands of a computer";

        return (
            <div>
                <Header title={title} subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick} />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption={this.handleAddOption}
                />
                <OptionModal
                    selectedOptions={this.state.selectedOptions}
                    clearSelectedOption={this.clearSelectedOption}
                />

            </div>
        )
    }
}
