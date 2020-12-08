import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './scrollable-tabs.css';

import Header from './components/header/header';
import Content from './components/content/content';
import {defaultWidth, defaultHeight, WidthContext} from './context';
import Modal from './components/ui-components/modal/modal';

export default class ScrollableTabs extends Component {
  idToDelete = null;
  state = {
    tabsState: [
      {
        id: 1,
        value: 'First tab content'
      },
      {
        id: 2,
        value: 'Second tab content'
      },
      {
        id: 3,
        value: 'Third tab content'
      }
    ],
    currentTabId: 1,
    showModal: false
  };

  onAddingTab = () => {
    this.setState((prevState) => {
      const {length} = prevState.tabsState;

      if (length < 10) {
        const newId = length + 1;
        const newTab = {
          id: newId,
          value: `${newId}th demo content`
        };

        const newTabsState = prevState.tabsState.concat(newTab);

        return {
          tabsState: newTabsState
        };
      }
    });
  };

  onRemovingTab = (id) => {
    const indexToDelete = this.state.tabsState.findIndex(
      (state) => state.id === id
    );

    const newTabsState = this.state.tabsState.filter(
      (state) => state.id !== id
    );

    const newState = {
      tabsState: newTabsState
    };

    if (id === this.state.currentTabId) {
      const newlySelectedTab = newTabsState[indexToDelete];
      const lastElement = newTabsState[newTabsState.length - 1];

      newState['currentTabId'] = newlySelectedTab
        ? newlySelectedTab.id
        : lastElement.id;
    }

    this.setState(newState);
  };

  getContentValue() {
    const currentTab = this.state.tabsState.filter(
      ({id}) => id === this.state.currentTabId
    );

    return currentTab[0].value;
  }

  showRightChevron() {
    const {currentTabId, tabsState} = this.state;
    const lastElement = tabsState[tabsState.length - 1];

    return currentTabId !== lastElement.id;
  }

  showLeftChevron() {
    const {currentTabId, tabsState} = this.state;
    const firstElement = tabsState[0];

    return currentTabId !== firstElement.id;
  }

  onSelectingTab = (id) => {
    this.setState({
      currentTabId: id
    });
  };

  openModal = (id) => {
    this.idToDelete = id;
    this.setState({
      showModal: true
    });
  };

  closeModal = (confirm) => {
    if (confirm) {
      this.onRemovingTab(this.idToDelete);
    }

    this.setState({
      showModal: false
    });
  };

  onListReorder = (result) => {
    const {source, destination} = result;

    if (source && destination) {
      const {index: srcIdx} = source;
      const {index: destIdx} = destination;

      if (srcIdx != undefined && destIdx != undefined) {
        const sourceItem = this.state.tabsState[srcIdx];
        const filteredTabsState = this.state.tabsState.filter(
          (itme) => itme.id !== sourceItem.id
        );
        const firstSlice = filteredTabsState.slice(0, destIdx);
        const secondSlice = filteredTabsState.slice(destIdx);
        const tabsState = [...firstSlice, sourceItem, ...secondSlice];

        this.setState({
          tabsState
        });
      }
    }
  };

  render() {
    const width = this.props.width || defaultWidth;
    const height = this.props.height || defaultHeight;

    return (
      <WidthContext.Provider value={width}>
        <div style={{width, height, border: '1px solid #aaa69d'}}>
          <Header
            onListReorder={this.onListReorder}
            tabsState={this.state.tabsState}
            showRightChevron={this.showRightChevron()}
            showLeftChevron={this.showLeftChevron()}
            currentTabId={this.state.currentTabId}
            onAdd={this.onAddingTab}
            onRemove={this.openModal}
            onSelect={this.onSelectingTab}
          />
          <Content height={height} value={this.getContentValue()} />
          <Modal show={this.state.showModal} closeModal={this.closeModal} />
        </div>
      </WidthContext.Provider>
    );
  }
}

ScrollableTabs.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};
