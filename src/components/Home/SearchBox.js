import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { makeLocationSearch } from '../../TaxiAmareloAPI';
import SearchBoxItem from '../Home/SearchBoxItem'

export default class SearchBox extends Component {

    timer = null;

    constructor(props) {
        super(props);
        this.state = {
            txt: '',
            results: [],
        };
        this.txtFill = this.txtFill.bind(this);
        this.doSearch = this.doSearch.bind(this);
    }

    txtFill(text) {
        this.setState({ txt: text, results: [] });

        if (typeof this.timer != null) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(this.doSearch, 1500);
    }

    doSearch() {
        makeLocationSearch(this.state.txt)
            .then((results) => {
                this.setState({ results })
            })
            .catch(() => {
                alert("Ocorreu um Erro");
            });
    }
   
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <TextInput style={styles.input}
                        value={this.state.txt}
                        onChangeText={this.txtFill}
                        placeholder="Para Onde Voce Pretende Ir?">
                    </TextInput>
                </View>
                {this.state.results.length > 0 &&
                    <ScrollView style={styles.results}>
                        {this.state.results.map((item) => {
                            return (
                                <SearchBoxItem dataClick={() => {
                                    this.props.dataClick(item);
                                    this.setState({ results: [], txt: item.label });
                                }}
                                key={item.id} data={item} />
                            );
                        })}
                    </ScrollView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    box: {
        width: '80%',
        height: 50,
        marginTop: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        elevation: 4,
        shadowOffset: { width: 20, height: 20 },
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    input: {
        textAlign: 'center',
        width: '100%',
        height: '100%',
        padding: 10,
        fontSize: 19
    },
    results: {
        width: '80%',
        marginBottom: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    }
}
);