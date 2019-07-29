import React from "react";
import { StyleSheet, FlatList, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import FlippingCard from "./FlippingCard";
import { setCards } from "../redux/actions";

const mapStateToProps = state => {
    return { cards: state.cards };
}

const mapDispatchToProps = dispatch => {
    return { setCards: cards => dispatch(setCards(cards))};
}

class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.onCreatePress = this.onCreatePress.bind(this);
        this.goToAddOrEdit = this.goToAddOrEdit.bind(this);
    }

    render() {
        return (
            <ScrollView>
                <FlatList
                    style={styles.list}
                    data={this.props.cards}
                    keyExtractor={item => item._id}
                    renderItem={({item}) =>
                        <FlippingCard 
                            /* Pass card and onEdit props down to Card so the edit button click can be handled */
                            card={item}
                            onEdit={this.goToAddOrEdit}
                        />
                    }
                />
                <TouchableOpacity style={styles.fab} onPress={this.onCreatePress}>
                    <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </ScrollView>
            
        );
    }

    onCreatePress() {
        this.goToAddOrEdit();
    }

    goToAddOrEdit(card = {}) {
        this.props.navigation.navigate("AddEdit", card);
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 20
    },
    fab: { 
        position: "absolute", 
        width: 56, 
        height: 56, 
        alignItems: 'center', 
        justifyContent: 'center', 
        right: 20, 
        bottom: 20, 
        backgroundColor: '#03A9F4', 
        borderRadius: 30, 
        elevation: 8,
    }, 
    fabIcon: { 
          fontSize: 40, 
          color: 'white',
          transform: [ { translateY: -2 } ]
    }
})

const CardList = connect(mapStateToProps, mapDispatchToProps) (List);

export default CardList;