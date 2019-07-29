import React from "react";
import { StyleSheet } from "react-native";
import CardFlip from 'react-native-card-flip';
import Card from "./Card";

export default class FlippingCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isQuestion: Math.random() >= 0.5};
    }

    render() {
        return(
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
                <Card 
                    onFlip={() => this.card.flip()}
                    onEdit={this.props.onEdit}
                    card={this.props.card} 
                    text={this.state.isQuestion ? this.props.card.question : this.props.card.answer}
                />
                <Card 
                    onFlip={() => this.card.flip()}
                    onEdit={this.props.onEdit} 
                    card={this.props.card} 
                    text={this.state.isQuestion ? this.props.card.answer : this.props.card.question}
                />
            </CardFlip>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        width: 300,
        height: 450,
        marginTop: 15,
    },
});