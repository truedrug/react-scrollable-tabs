import React, {Component, createRef} from 'react';
import './header.css';

import {WidthContext} from '../../context';
import Tabs from './tabs/tabs';

// The import path cannot be started with . , instead start with / to avoid
// https://github.com/transitive-bullshit/create-react-library/issues/285
import PlusIcon from '/../../icons/plus.svg';
import LeftChevronIcon from '/../../icons/chevron-left.svg';
import RightChevronIcon from '/../../icons/chevron-right.svg';

const tabWidth = 120;
const iconWidth = 40;

export default class extends Component {
  static contextType = WidthContext;
  tabsRef = createRef();

  areChevronsRequired() {
    return this.context < this.props.tabsState.length * tabWidth + iconWidth;
  }

  getScrollerWidth() {
    // iconWidth: each iconWidth is 40px (plus icon, left and right chevron)
    return (
      this.context -
      iconWidth -
      (this.props.showLeftChevron ? iconWidth : 0) -
      (this.props.showRightChevron ? iconWidth : 0)
    );
  }

  leftSlide = () => {
    this.tabsRef.current.scrollBy({
      left: -120,
      behavior: 'smooth'
    });
  };

  rightSlide = () => {
    this.tabsRef.current.scrollBy({
      left: 120,
      behavior: 'smooth'
    });
  };

  render() {
    const areChevronsRequired = this.areChevronsRequired();

    if (!areChevronsRequired) {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Tabs
            onDragEnd={this.props.onListReorder}
            tabsState={this.props.tabsState}
            currentTabId={this.props.currentTabId}
            onRemove={this.props.onRemove}
            onSelect={this.props.onSelect}
          />

          <button className="header-button" onClick={this.props.onAdd}>
            <img className="icon-btn add-btn" src={PlusIcon} alt="Add" />
          </button>
        </div>
      );
    }

    return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {this.props.showLeftChevron ? (
          <button className="header-button" onClick={this.leftSlide}>
            <img
              className="icon-btn chevron-btn"
              src={LeftChevronIcon}
              alt="Slide left"
            />
          </button>
        ) : null}

        <div style={{width: this.getScrollerWidth()}}>
          <Tabs
            forwardedRef={this.tabsRef}
            onDragEnd={this.props.onListReorder}
            tabsState={this.props.tabsState}
            currentTabId={this.props.currentTabId}
            onRemove={this.props.onRemove}
            onSelect={this.props.onSelect}
          />
        </div>
        {this.props.showRightChevron ? (
          <button className="header-button" onClick={this.rightSlide}>
            <img
              className="icon-btn chevron-btn"
              src={RightChevronIcon}
              alt="Slide right"
            />
          </button>
        ) : null}

        <button className="header-button" onClick={this.props.onAdd}>
          <img className="icon-btn add-btn" src={PlusIcon} alt="Add" />
        </button>
      </div>
    );
  }
}
