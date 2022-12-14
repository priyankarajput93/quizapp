import {useWindowDimensions} from 'react-native';
import {View} from 'react-native';
import RenderHtml from 'react-native-render-html';

function RenderHTMLView({text}) {
  const {width} = useWindowDimensions();

  // this is used to display HTML data is correct way
  const data = {
    html: `
      <p 
       style='text-align:left; 
       color:#016082; 
       font-size:18px;
       margin: 10px 10px 10px 10px;'>
         ${text}
      </p>`,
  };
  return (
    <View>
      <RenderHtml contentWidth={width} source={data} />
    </View>
  );
}

export default RenderHTMLView;
