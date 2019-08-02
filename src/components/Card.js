import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "react-native-elements";
import { deleteCard } from "../redux/thunks/cardAsync";

const mapDispatchToProps = dispatch => bindActionCreators (
    { 
        deleteCard: deleteCard 
    },
    dispatch
)


class CardElement extends React.Component {

    constructor(props) {
        super(props);
        this.editCard = this.editCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
    }

    render() {
        return(
            <TouchableOpacity style={styles.card} activeOpacity={1.0} onPress={this.props.onFlip}>
                <View style={styles.cardTextContainer}> 
                    <Text style={styles.cardText}>
                        {this.props.text}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title="Edit" type="outline" buttonStyle={styles.button} onPress={this.editCard}/>
                    <Button title="Delete" type="outline" buttonStyle={styles.button} onPress={this.deleteCard}/>
                </View>
            </TouchableOpacity>
        );
    }

    editCard() {
        this.props.onEdit(this.props.card);
    }

    deleteCard() {
        this.props.deleteCard(this.props.card);
    }
}

const Card = connect(null, mapDispatchToProps) (CardElement);

export default Card;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#7575FF",   
        flex: 1,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.5,
    },
    cardTextContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cardText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#FEFEFE",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    button: {
        width: 110,
        height: 50,
        backgroundColor: "#FEFEFE",
    }
});