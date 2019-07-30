import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { View,  StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { uploadCard, updateCard } from "../redux/thunks/cardAsync";
import { invalidAnswer } from "../redux/actions/cardActions";

const mapStateToProps = state => {
    return {
        isAnswerInvalid: state.isAnswerInvalid,
        uploadError: state.uploadError,
    }
}

const mapDispatchToProps = dispatch => bindActionCreators (
    {
        uploadCard: uploadCard,
        updateCard: updateCard,
        invalidAnswer: invalidAnswer
    },
    dispatch
);

class AddEditCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {question: "", answer: "", isQuestionInvalid: false};
        this.isQuestionValid = this.isQuestionValid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const question = navigation.getParam("question");
        const answer = navigation.getParam("answer");
        this.props.invalidAnswer(false);
        this.setState({question: question, answer: answer, isQuestionInvalid: false});
    }

    render() {
        const invalidQuestionMessage = "Invalid question! Must be at least 8 characters long and must contain a ? at the end!";
        const invalidAnswerMessage = "Answer cannot be empty!";
        const id = this.props.navigation.getParam("_id", "0");

        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.formContainer}>
                        <Input onChangeText={(text) => this.setState({question: text})} value={this.state.question} 
                            inputStyle={styles.input}
                            label={"Question"} 
                            labelStyle={styles.label} 
                            errorMessage={this.state.isQuestionInvalid ? invalidQuestionMessage : null} 
                        />
                        <Input onChangeText={(text) => this.setState({answer: text})} value={this.state.answer} 
                            containerStyle={styles.inputContainer}
                            inputStyle={styles.input}
                            label={"Answer"} 
                            labelStyle={styles.label} 
                            errorMessage={this.props.isAnswerInvalid ? invalidAnswerMessage : null} 
                        />
                        <Button title="Submit" type="outline" buttonStyle={styles.button} onPress={() => this.onSubmit(id)}/>
                    </View>
                </View>
            </View>
        );
    }

    isQuestionValid() {
        if (Object.keys(this.state.question).length === 0) {
            return false;
        }
        const {question} = this.state;
        return (question.length >= 8 && question[question.length-1] === "?");
    }

    onSubmit(id) {
        const {question} = this.state;
        const {answer} = this.state;

        // id 0 means it's a new card otherwise it already exists
        if (id === "0") {
            if(this.isQuestionValid()) {
                this.props.uploadCard({ question: question, answer: answer });
                this.setState({question: "", answer: "", isQuestionInvalid: false});
            }
            else {
                this.setState({isQuestionInvalid: true});
            }
            
        }
        else {
            if(this.props.updateCard({ _id: id, question: question, answer: answer })) {
                this.props.navigation.navigate("List");
            }
        }
    }
}

const AddOrEditCard = connect(mapStateToProps, mapDispatchToProps) (AddEditCard);

export default AddOrEditCard;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex:1,
        margin: 10
    },
    card: {
        width: 300,
        height: 450,
        backgroundColor: "#7575FF",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"

    },
    formContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
    },
    inputContainer: {
        marginTop: 50
    },
    label: {
        color: "#FEFEFE",
        fontSize: 25,
        
    },
    input: {
        color: "#FEFEFE",
        fontSize: 18,       
    },
    button: {
        marginTop: 80,
        width: 110,
        height: 50,
        backgroundColor: "#FEFEFE",
    }
});