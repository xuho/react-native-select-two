//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, FlatList, TextInput, Dimensions, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import Button from './lib/Button';
import TagItem from './lib/TagItem';
import utilities from './lib/utilities';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');
// create a component
class Select2 extends Component {
    static defaultProps = {
        cancelButtonText: 'Hủy',
        selectButtonText: 'Chọn',
        listEmptyTitle: 'Không tìm thấy lựa chọn phù hợp',
        colorTheme: '#16a45f'
    }
    state = {
        show: false,
        preSelectedItem: [],
        selectedItem: [],
        data: [],
        keyword: ''
    }
    animatedHeight = new Animated.Value(height * 0.6);
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

    onItemSelected = (item, isSelectSingle) => {
        let selectedItem = [];
        let { data } = this.state;
        item.checked = !item.checked;
        for (let index in data) {
            if (data[index].id === item.id) {
                data[index] = item;
            } else if (isSelectSingle) {
                data[index].checked = false;
            }
        }
        data.map(item => {
            if (item.checked) selectedItem.push(item);
        })
        this.setState({ data, selectedItem });
    }
    keyExtractor = (item, idx) => item.id ? item.id.toString() : idx.toString();
    renderItem = ({ item, idx }) => {
        let { colorTheme = '#16a45f', isSelectSingle } = this.props;
        return (
            <TouchableOpacity
                key={item.id ? item.id.toString() : idx.toString()}
                onPress={() => this.onItemSelected(item, isSelectSingle)}
                activeOpacity={0.7}
                style={styles.itemWrapper}>
                <Text style={styles.itemText}>
                    {item.name}
                </Text>
                <Icon style={styles.itemIcon}
                    name={item.checked ? 'check-circle-outline' : 'radiobox-blank'}
                    color={item.checked ? colorTheme : '#777777'} size={20} />
            </TouchableOpacity>
        );
    }
    renderEmpty = () => {
        let { listEmptyTitle } = this.props;
        return (
            <Text style={styles.empty}>
                {listEmptyTitle}
            </Text>
        );
    }
    closeModal = () => this.setState({ show: false });
    showModal = () => this.setState({ show: true });

    render() {
        let {
            style, title, onSelect, onRemoveItem, popupTitle, colorTheme,
            isSelectSingle, cancelButtonText, selectButtonText
        } = this.props;
        let { show, selectedItem, preSelectedItem } = this.state;
        return (
            <TouchableOpacity
                onPress={this.showModal}
                activeOpacity={0.7}
                style={[styles.container, style]}>
                <Modal
                    onBackdropPress={this.closeModal}
                    style={{
                        justifyContent: 'flex-end',
                        margin: 0
                    }}
                    useNativeDriver={true}
                    animationInTiming={300}
                    animationOutTiming={300}
                    hideModalContentWhileAnimating
                    isVisible={show}>
                    <Animated.View style={[styles.modalContainer, { height: this.animatedHeight }]}>
                        <View>
                            <Text style={[styles.title, { color: colorTheme }]}>
                                {popupTitle || title}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <TextInput
                            underlineColorAndroid='transparent'
                            returnKeyType='done'
                            style={styles.inputKeyword}
                            placeholder='Nhập từ khóa'
                            selectionColor={colorTheme}
                            onChangeText={keyword => this.setState({ keyword })}
                            onFocus={() => {
                                Animated.spring(this.animatedHeight, {
                                    toValue: height * 0.6 + height * 0.2,
                                    friction: 7
                                }).start();
                            }}
                            onBlur={() => {
                                Animated.spring(this.animatedHeight, {
                                    toValue: height * 0.6,
                                    friction: 7
                                }).start();
                            }}
                        />
                        <FlatList
                            style={styles.listOption}
                            data={this.dataRender || []}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                        />

                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => {
                                    this.cancelSelection();
                                }}
                                title={cancelButtonText}
                                textColor={colorTheme}
                                backgroundColor='#fff'
                                style={[styles.button, { marginRight: 5, marginLeft: 10, borderWidth: 1, borderColor: colorTheme }]} />
                            <Button
                                onPress={() => {
                                    let selectedIds = [];
                                    selectedItem.map(item => {
                                        selectedIds.push(item.id);
                                    })
                                    onSelect && onSelect(selectedIds);
                                    this.setState({ show: false, keyword: '', preSelectedItem: selectedItem });
                                }}
                                title={selectButtonText}
                                backgroundColor={colorTheme}
                                style={[styles.button, { marginLeft: 5, marginRight: 10 }]} />
                        </View>
                    </Animated.View>
                </Modal>
                {
                    preSelectedItem.length > 0
                        ? (
                            isSelectSingle
                                ? <Text style={styles.selectedTitlte}>{preSelectedItem[0].name}</Text>
                                : <View style={styles.tagWrapper}>
                                    {
                                        preSelectedItem.map((tag, index) => {
                                            return (
                                                <TagItem
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
                                            );
                                        })
                                    }
                                </View>
                        )
                        : <Text style={styles.selectedTitlte}>{title}</Text>
                }
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: '100%', minHeight: 45, borderRadius: 2, paddingHorizontal: 16,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1,
        borderColor: '#cacaca', paddingVertical: 4
    },
    modalContainer: {
        paddingTop: 16, backgroundColor: '#fff', borderTopLeftRadius: 8, borderTopRightRadius: 8
    },
    title: {
        fontWeight: 'bold', fontSize: 16, marginBottom: 16, width: '100%', textAlign: 'center'
    },
    line: {
        height: 1, width: '100%', backgroundColor: '#cacaca'
    },
    inputKeyword: {
        height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#cacaca',
        paddingLeft: 8, marginHorizontal: 24, marginTop: 16
    },
    buttonWrapper: {
        marginVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    button: {
        height: 36, flex: 1
    },
    selectedTitlte: {
        fontSize: 14, color: 'gray'
    },
    tagWrapper: {
        flexDirection: 'row', flexWrap: 'wrap'
    },
    listOption: {
        paddingHorizontal: 24,
        paddingTop: 1
    },
    itemWrapper: {
        borderBottomWidth: 1, borderBottomColor: '#eaeaea',
        paddingVertical: 12, flexDirection: 'row', alignItems: 'center'
    },
    itemText: {
        fontSize: 16, color: '#333', flex: 1
    },
    itemIcon: {
        width: 30, textAlign: 'right'
    },
    empty: {
        fontSize: 16, color: 'gray', alignSelf: 'center', textAlign: 'center', paddingTop: 16
    }
});

Select2.propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    onSelect: PropTypes.func,
    onRemoveItem: PropTypes.func,
    popupTitle: PropTypes.string,
    colorTheme: PropTypes.string,
    isSelectSingle: PropTypes.bool,
    cancelButtonText: PropTypes.string,
    selectButtonText: PropTypes.string
}

//make this component available to the app
export default Select2;
