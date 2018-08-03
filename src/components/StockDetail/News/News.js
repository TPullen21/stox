import React from 'react';
import Moment from 'react-moment';

import './News.css'

const openNewsUrlInNewTab = url => {
    const win = window.open(url, '_blank');
    win.focus();
}

const news = (props) => {

    const relativeTime = props.datetime;

    let { summary } = props;

    if(summary && summary.startsWith('No summ')) {
        summary = null;
    }

    return (
        <div className="News" onClick={() => openNewsUrlInNewTab(props.url)}>
            <div className="Source">{props.source} • <Moment fromNow>{relativeTime}</Moment></div>
            <div className="Headline">{props.headline}</div>
            <div className="Summary">{summary}</div>
        </div>
    );

}

export default news;