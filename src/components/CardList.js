import React from "react";
import { StyleSheet, FlatList, ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import FlippingCard from "./FlippingCard";
import { fetchCards } from "../redux/thunks/cardAsync";

const mapStateToProps = state => {
    return { 
        cards: state.cards, 
        isFetching: state.isFetching
    };
}

const mapDispatchToProps = dispatch => bindActionCreators (
    {
        fetchCards: fetchCards
    },
    dispatch
);

class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.onCreatePress = this.onCreatePress.bind(this);
        this.goToAddOrEdit = this.goToAddOrEdit.bind(this);
    }

    componentDidMount() {
        this.props.fetchCards();
    }

    render() {
        if(this.props.isFetching) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <View style={styles.container}>
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
                </ScrollView>
                <TouchableOpacity style={styles.fab} onPress={this.onCreatePress}>
                        <Text style={styles.fabIcon}>+</Text>
                </TouchableOpacity>
            </View>
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
    container: {
        justifyContent: 'center',
        flex:1,
        margin: 10
    },
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