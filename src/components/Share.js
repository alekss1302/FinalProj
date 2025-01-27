import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
} from 'react-share';

const Share = ({ url, title }) => {
    return (
        <div className="flex space-x-4 mt-4">
            <FacebookShareButton url={url} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={url} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
};

export default Share;
