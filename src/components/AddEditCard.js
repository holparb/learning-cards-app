import React from "react";
import { connect } from "react-redux";
import { View,  StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { addCard, editCard } from "../redux/actions";

const mapDispatchToProps = dispatch => {
    return { 
        addCard: card => dispatch(addCard(card)),
        editCard: card => dispatch(editCard(card)) 
    };
}

class AddEditCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {question: "", answer: "", isQuestionInvalid: false};
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        const question = navigation.getParam("question");
        const answer = navigation.getParam("answer");
        this.setState({question: question, answer: answer});
    }

    render() {
        const errorMessage = "Invalid question! Must be at least 8 characters long and must contain a ? at the end!";
        const id = this.props.navigation.getParam("_id", "0");

        return (
            <View style={styles.card}>
                <View style={styles.formContainer}>
                    <Input onChangeText={(text) => this.setState({question: text})} value={this.state.question} 
                        inputStyle={styles.input}
                        label={"Question"} 
                        labelStyle={styles.label} 
                        errorMessage={this.state.isQuestionInvalid ? errorMessage : null} 
                    />
                    <Input onChangeText={(text) => this.setState({answer: text})} value={this.state.answer} 
                        containerStyle={styles.inputContainer}
                        inputStyle={styles.input}
                        label={"Answer"} 
                        labelStyle={styles.label} 
                    />
                    <Button title="Submit" type="outline" buttonStyle={styles.button} onPress={() => this.onSubmit(id)}/>
                </View>
            </View>
        );
    }

    onSubmit(id) {
        const { question } = this.state;
        const { answer } = this.state;

        //id 0 means it's a new card
        if (id === "0" ) {
            //generated id needs to be received to properly update the cards array in the store
            //this.props.addCard({ question: question, answer: answer });
        }
        else {
            this.props.editCard({ _id: id, question: question, answer: answer });
        }
        this.props.navigation.navigate("List");
    }
}

const AddOrEditCard = connect(null, mapDispatchToProps) (AddEditCard);

export default AddOrEditCard;

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 450,
        backgroundColor: "#4C4CFF",
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
        width: 110,
        height: 50,
        backgroundColor: "#FEFEFE",
    }
});