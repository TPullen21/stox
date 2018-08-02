import React from 'react';
import Moment from 'react-moment';

import './News.css'

const news = (props) => {

    const relativeTime = props.datetime;

    let summary = props.summary;
    let articleUrl = <a href={props.url} target="__blank">Read more</a>;

    if(summary && summary.startsWith('No summ')) {
        summary = articleUrl;
        articleUrl = null;
    }

    return (
        <div className="News">
            <div className="Source">{props.source} • <Moment fromNow>{relativeTime}</Moment></div>
            <div className="Headline">{props.headline}</div>
            <div className="Summary">{summary}</div>
            <div className="ArticleUrl">{articleUrl}</div>
        </div>
    );

}

export default news;