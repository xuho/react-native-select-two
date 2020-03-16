
## react-native-select-two
## Component like [Select2](https://select2.org/) on web for React Native


## Add it to your project

1. Insall package
    - Using NPM
    `npm install react-native-select-two` 
    - Using Yarn
    `yarn add react-native-select-two`
2. Import package
    `import Select2 from 'react-native-select-two';`

## Usage



```javascript
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Select2 from 'react-native-select-two';

const mockData = [
    { id: 1, name: 'React Native Developer', checked: true }, // set default checked for render option item
    { id: 2, name: 'Android Developer' },
    { id: 3, name: 'iOS Developer' }
];

// create a component
class CreateNewAppointment extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Select2
                    isSelectSingle
                    style={{ borderRadius: 5 }}
                    colorTheme={'blue'}
                    popupTitle='Select item'
                    title='Select item'
                    data={mockData}
                    onSelect={data => {
                        this.setState({ data });
                    }}
                    onRemoveItem={data => {
                        this.setState({ data });
                    }} 
                />
            </View>
        );
    }
}
```

## Usage

### Single select
![Single select](https://raw.githubusercontent.com/xuho/demo-images/master/react-native-select2-single-select.gif)
### Multiple select
![Multiple select](https://raw.githubusercontent.com/xuho/demo-images/master/react-native-select2-multipe-select.gif)



## Props

- **`style`** _(Object)_ - Custom style for component
- **`title`** _(String)_ String display when you don't select any item
- **`data`** _(Array)_ - Datasource of list options: an array of objects (each object have ```name``` property)
- **`onSelect`** _(Function)_ - The callback function trigger after you press select button
- **`onRemoveItem`** _(Function)_ - The callback function trigger after you press tags to remove them
- **`popupTitle`** _(String)_ - Title of modal select item
- **`colorTheme`** _(String)_ - Color theme
- **`isSelectSingle`** _(Bool)_ - Set ```false``` if you want select multiple
- **`showSearchBox`** _(Bool)_ - Set ```false``` if you want hide search box, default value is ```true```
- **`cancelButtonText`** _(String)_ - Cancel button text title
- **`selectButtonText`** _(String)_ - Select button text title
- **`defaultFontName`** _(String)_ - Set custom font for all components
- **`selectedTitlteStyle`** _(Object)_ - Set custom style for display selected title text
- **`buttonTextStyle`** _(Object)_ - Set custom button text style
- **`buttonStyle`** _(Object)_ - Set custom button style

**MIT Licensed**
