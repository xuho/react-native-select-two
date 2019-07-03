//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, FlatList, TextInput, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Button from './Button';
import utilities from './utilities';

import TagItem from './TagItem';

const { height } = Dimensions.get('window');
// create a component
class Select2 extends Component {
    state = {
        show: false,
        preSelectedItem: [],
        selectedItem: [],
        data: [],
        keyword: ''
    }
    componentDidMount() {
        let preSelectedItem = [];
        let { data } = this.props;
        data.map(item => {
            if (item.checked) {
                preSelectedItem.push(item);
            }
        })
        this.setState({ data, preSelectedItem });
    };
    get dataRender() {
        let { data, keyword } = this.state;
        let listMappingKeyword = [];
        data.map(item => {
            if (utilities.changeAlias(item.name).includes(utilities.changeAlias(keyword))) {
                listMappingKeyword.push(item);
            }
        });
        return listMappingKeyword;
    }

    cancelSelection() {
        let { data, preSelectedItem } = this.state;
        data.map(item => {
            item.checked = false;
            for (let _selectedItem of preSelectedItem) {
                if (item.id === _selectedItem.id) {
                    item.checked = true;
                    break;
                }
            }
        });
        this.setState({ data, show: false, keyword: '', selectedItem: preSelectedItem });
    }

    render() {
        let { style, title, onSelect, onRemoveItem, popupTitle } = this.props;
        let { show, data, selectedItem, preSelectedItem } = this.state;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({ show: true });
                }}
                activeOpacity={0.7}
                style={[styles.container, style]}>
                <Modal
                    useNativeDriver={true}
                    animationInTiming={300}
                    animationOutTiming={300}
                    isVisible={show}>
                    <View style={styles.modalContainer}>
                        <View>
                            <Text style={styles.title}>
                                {popupTitle || title}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <TextInput
                            underlineColorAndroid='transparent'
                            style={{
                                height: 40, borderRadius: 2, borderWidth: 1, borderColor: '#cacaca',
                                paddingLeft: 8, marginVertical: 10, marginHorizontal: 24
                            }}
                            selectionColor={'#16a45f'}
                            onChangeText={keyword => this.setState({ keyword })}
                        />
                        <FlatList
                            style={{ paddingHorizontal: 24 }}
                            data={this.dataRender || []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            let selectedItem = [];
                                            let { data } = this.state;
                                            item.checked = !item.checked;
                                            for (let index in data) {
                                                if (data[index].id === item.id) {
                                                    data[index] = item;
                                                    break;
                                                }
                                            }
                                            data.map(item => {
                                                if (item.checked) selectedItem.push(item);
                                            })
                                            this.setState({ data, selectedItem });
                                        }}
                                        activeOpacity={0.7}
                                        style={{
                                            borderBottomWidth: 1, borderBottomColor: '#eaeaea',
                                            paddingVertical: 12, flexDirection: 'row', alignItems: 'center'
                                        }}>
                                        <Text style={{ fontSize: 16, color: '#333', flex: 1 }}>
                                            {item.name}
                                        </Text>
                                        <Icon style={{ width: 30, textAlign: 'right' }}
                                            name={item.checked ? 'check-circle-outline' : 'radiobox-blank'}
                                            color={item.checked ? '#16a45f' : '#777777'} size={20} />
                                    </TouchableOpacity>
                                );
                            }}
                        />

                        <View style={{ marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                            <Button
                                onPress={() => {
                                    this.cancelSelection();
                                }}
                                title='Hủy'
                                textColor={'#16a45f'}
                                backgroundColor='#fff'
                                style={{ height: 36, width: 120, marginRight: 5, marginLeft: 10, borderWidth: 1, borderColor: '#16a45f' }} />
                            <Button
                                onPress={() => {
                                    let selectedIds = [];
                                    selectedItem.map(item => {
                                        selectedIds.push(item.id);
                                    })
                                    onSelect && onSelect(selectedIds);
                                    this.setState({ show: false, keyword: '', preSelectedItem: selectedItem });
                                }}
                                title='Chọn'
                                backgroundColor={'#16a45f'}
                                style={{ height: 36, width: 120, marginLeft: 5, marginRight: 10 }} />
                        </View>
                    </View>
                </Modal>
                {
                    preSelectedItem.length > 0
                        ? <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {
                                preSelectedItem.map((tag, index) => {
                                    return <TagItem
                                        key={index}
                                        onRemoveTag={() => {
                                            let preSelectedItem = [];
                                            let selectedIds = [];
                                            let { data } = this.state;
                                            data.map(item => {
                                                if (item.id === tag.id) {
                                                    item.checked = false;
                                                }
                                                if (item.checked) {
                                                    preSelectedItem.push(item);
                                                    selectedIds.push(item.id);
                                                };
                                            })
                                            this.setState({ data, preSelectedItem });
                                            onRemoveItem(selectedIds);
                                        }}
                                        tagName={tag.name} />
                                })
                            }
                        </View>
                        : <Text style={{ fontSize: 14, color: 'gray' }}>{title}</Text>
                }
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%', minHeight: 45, borderRadius: 2, paddingHorizontal: 16,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#cacaca',
        paddingVertical: 4
    },
    modalContainer: {
        paddingTop: 16, backgroundColor: '#fff', borderRadius: 3,
        maxHeight: height * 0.7,
    },
    title: { color: '#16a45f', fontWeight: 'bold', fontSize: 16, marginBottom: 10, width: '100%', textAlign: 'center' },
    line: { height: 1, width: '100%', backgroundColor: '#cacaca' },
});

//make this component available to the app
export default Select2;
