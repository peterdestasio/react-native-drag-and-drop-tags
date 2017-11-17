import React, { PureComponent } from 'react';
import {
  StyleSheet,
  LayoutAnimation,
  PanResponder,
  View
} from 'react-native';
import TagsArea from './TagsArea';
import type { TagObject, GestureState } from '../types';

type Props = {
  // Array of tag titles
  tags: string[],
  // tag swapping animation duration in ms
  animationDuration: number,
  // Passes onPressAddNewTag callback down to TagsArea component
  onPressAddNewTag: () => void,
};

type State = {
  tags: TagObject[],
};

export default class Tags extends PureComponent {

  props: Props;

  static defaultProps = {
    animationDuration: 250
  };

  state: State = {
    // Convert passed array of tag titles to array of objects of TagObject type,
    // so ['tag', 'another'] becomes [{ title: 'tag' }, { title: 'another' }]
    tags: [...new Set(this.props.tags)]       // remove duplicates
      .map((title: string) => ({ title })),   // convert to objects
  };

  // PanResponder to handle drag and drop gesture
  panResponder: PanResponder;

  // Initialize PanResponder
  componentWillMount() {
    this.panResponder = this.createPanResponder();
  }

  // Animate layout changes when dragging or removing a t ag
  componentWillUpdate() {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: this.props.animationDuration
    });
  }

  // Create PanResponder
  createPanResponder = (): PanResponder => PanResponder.create({
    // Handle drag gesture
    onMoveShouldSetPanResponder: (_, gestureState: GestureState) => this.onMoveShouldSetPanResponder(gestureState),
    onPanResponderGrant: (_, gestureState: GestureState) => this.onPanResponderGrant(),
    onPanResponderMove: (_, gestureState: GestureState) => this.onPanResponderMove(gestureState),
    // Handle drop gesture
    onPanResponderRelease: (_, gestureState: GestureState) => this.onPanResponderEnd(),
    onPanResponderTerminate: (_, gestureState: GestureState) => this.onPanResponderEnd(),

  });

  // Find out it we need to start handling tag dragging gesture
  onMoveShouldSetPanResponder = (gestureState: GestureState): boolean => {
    console.log('setting PanResponder');
    return true;
  };

  // Called when gesture is granted
  onPanResponderGrant = (): void => {
    console.log('granted');
  };

  // Handle drag gesture
  onPanResponderMove = (gestures: GestureState): void => {
    const { moveX, moveY } = gestureState;
    console.log('onPanResponderMove', moveX, moveY);
  };

  // Called after gesture ends
  onPanResponderEnd = (): void => {
    console.log('ended');
  }

  // remove tags
  removeTag = (tag: TagObject): void => {
    this.setState((state: State) => {
      const index = state.tags.findIndex(({ title }) => title === tag.title);
      return {
        tags: [
          // remove the tag
          ...state.tags.slice(0, index),
          ...state.tags.slice(index + 1),
          // d
        ]
      }
    });
  }

  render() {
    const { tags } = this.state;
    return (
      <View
        style={styles.container}
        {...this.panResponder.panHandlers}
      >

        <TagsArea
          tags={tags}
          onPress={this.removeTag} 
          onRenderTag={() => { }} // do nothing for now
          onPressAddNew={this.props.onPressAddNewTag}
        />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
});