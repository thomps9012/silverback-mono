import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';

import { slugify } from '../utils';

export const Footer: React.FC = () => {
  const { allMdx } = useStaticQuery<{
    allMdx: {
      edges: {
        node: {
          frontmatter: {
            path: string;
            title: string;
          };
          headings: {
            value: string;
          }[];
        };
      }[];
    };
  }>(graphql`
    query FooterQuery {
      allMdx {
        edges {
          node {
            frontmatter {
              path
              title
            }
            headings(depth: h2) {
              value
            }
          }
        }
      }
    }
  `);

  return (
    <footer className="bg-amazee-dark">
      <div className="max-w-screen-xl mx-auto px-4 pt-10 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <Link to="/" className="flex">
              <svg
                className="h-10 fill-current text-white"
                viewBox="0 0 600 316"
              >
                <g>
                  <path
                    className="st0"
                    d="M78,1.4C82.9-0.9,88.5,0,93.4,1.7c2.7,0.8,4.8,2.8,7,4.6c4.7,3.5,8,8.5,10.4,13.8c2.8,7.6,5,15.6,4.7,23.7
    c-0.3,4.3,0.7,8.5,0.1,12.7c-0.4,4.2-2.1,8.1-3,12.1c-0.6,2.9-2.3,5.4-3.7,7.9c-0.2,0-0.7,0.1-0.9,0.1c-2-5.8-2.8-12-5.5-17.6
    c-1.8-3.3-3.5-6.6-5.7-9.6c-3.2-5.1-6.6-10.3-11.5-13.9c-3.5-2.4-7-4.9-10.2-7.7c-3.3-3.7-4.8-8.6-5.3-13.4C70,9.1,73,3.6,78,1.4
    L78,1.4z"
                  />
                  <path
                    className="st0"
                    d="M21,33.1c4.1-1.1,8.4-2.7,12.7-1.9c10.2,2,20.3,4.5,29.8,8.9c8.8,4.6,16,11.6,22.9,18.7
    c9.1,7.8,14,19,18.8,29.7c1.7,3.2,2.5,6.7,4,10c-0.5,0.4-1,0.8-1.4,1.2c-5.9-9-14.1-16.6-23.1-22.4c-6.9-3.5-14.5-5.2-22.1-6.3
    c-6-0.1-12,1.1-17.9,2.5c-5.4,1.7-10.5,4.3-15.9,6.1c-2.9,0.7-5.9,1.3-9,1.6C16,81.6,12.6,79.6,9.3,78c-4.7-3-6.9-8.5-8.6-13.6
    c-0.8-4.2-0.5-8.5,0.3-12.7c1.8-6.3,6.4-11.4,12.1-14.5C15.5,35.7,18,33.8,21,33.1L21,33.1z"
                  />
                  <path
                    className="st0"
                    d="M560.9,104.1c-3.6,3.5-7.6,7.4-13,7.8c-3.5,0.2-7.6-0.3-9.9-3.3c-2.4-2.7-4.1-6.3-3.7-10c2.9-2.3,6.1-4,9-6.4
    c3.9-3.5,8-7,10.8-11.5c2.7-4.6,6.3-8.9,7.7-14.1c1.4-4.5,1-9.5-0.6-13.8c-2.8-4.6-7.1-8.8-12.6-9.8c-6.8-0.5-13.6,1.5-19.8,4.3
    c-5.2,3.1-9.8,7.8-11.7,13.6c-1.9,3.9-3.1,8.1-3.7,12.3c-2.3,8.1-3,16.5-3.4,24.8c0.6,3.4,0.8,6.9,2,10.2
    c-4.2,5.9-10.7,11.4-18.3,11.2c-2.8,0.1-5.9,0.6-8.4-0.9c-4.7-2.6-6.9-8.9-4.9-13.8c2.2-2.2,5.1-3.5,7.5-5.3
    c8.5-6.9,16.1-15.4,20.4-25.5c1.1-4.3,1.5-8.9,0.3-13.2c-1.2-3.3-4.1-5.8-7.3-7.3c-4.3-1.7-9-1-13.5-0.7
    c-8.6,0.4-15.7,6.6-20.4,13.4c-3.7,4.8-5.4,10.7-7.4,16.4c-1.3,3.6-1,7.4-1.2,11.1c-0.7,5.8,0.1,11.6,1.4,17.3
    c0.4,5.1,2.4,10,4.8,14.5c2.1,4.1,6.2,6.4,10,8.5c1.4,0.8,2.9,1.1,4.5,1c4.3-0.4,8.7-0.8,12.7-2.4c5.2-2,10-5,14.6-8.2
    c3.7-2.6,6.6-6,9.5-9.4c1.6,2.1,3.8,3.6,6.1,4.8c3,1.5,5.9,3.3,9.2,4.1c6.1,1.2,12.5,0.5,18.2-1.9c3.4-1.5,6-4.1,8.6-6.7
    c4.3-4.8,8-10.6,8.1-17.2C564.4,99.6,563,102.2,560.9,104.1z M481.1,80.8c0.2-4.5,1.4-8.9,3.3-13c1.3-2.2,2.4-4.8,4.6-6.3
    c1.6-1.2,3.4-1.9,5.2-2.7c5.9,3.9,6.8,12.3,3.6,18.2c-2.4,4.4-4.6,9.1-8.4,12.5c-2.7,2.2-5.5,4.4-8.9,5.4
    C479.9,90.2,480.8,85.5,481.1,80.8z M534.1,73.7c1.8-6.9,3.2-14.2,7.6-20c1.3-1.7,3.4-3.1,5.6-2.3c1.8,0.9,3.4,2.1,4.7,3.7
    c1.6,3.3,2.1,7.2,0.7,10.7c-1.8,5.1-5.1,9.8-9.3,13.2c-2.8,2.9-6,5.3-9.4,7.3C533.3,82.1,532.9,77.8,534.1,73.7z"
                  />
                  <path
                    className="st0"
                    d="M598.7,94.8c-0.3-2.5-2.3-4.3-4-6c-1.9-1.8-3.9-4.2-6.8-4.1c-4.2-0.8-8.2,1.3-11.4,3.8
    c-1.9,2.2-3.5,5.1-2.8,8.1c2.2-2.1,4.2-4.8,7.3-5.7c2.8-0.8,5.5,1.1,7.2,3c2.5,4.2,0.7,9.2-1.1,13.3c-2.5,6.6-8.7,10.5-13.8,14.9
    c-3.6,3.2-8.1,5.1-12.1,7.7c-3,1.8-6.4,3-9.6,4.5c-5.3,2.3-10.8,4.4-16.5,5.4c-3.9,1-8,1.4-11.8,2.6c-4.1,0.9-8.2,1.4-12.4,1.6
    c-7.9,1.1-15.8,0.4-23.7,0.6c-6.7-0.2-13.5,0.4-20.2-0.7c-6.9-1-13.9-1.4-20.6-3.6c-5.1-1.3-10.3-2.5-15.6-2.3
    c1.7-5.8,4.4-11.1,5.9-16.9c1.9-5.6,4.5-11,6.4-16.6c4-9.7,7.4-19.6,11.6-29.2c1.8-5.6,4.7-10.7,7.5-15.9c-2.9,0.5-5.4,2.1-8.1,3.2
    c-3.5,1.7-7.2,2.4-10.9,3.3c-6.3,1.7-12.8,1.9-19.2,2.7c-6,0.1-12.6-1.5-18,2c-5.1,3-7.6,9.1-7.2,14.8c0.7,2.4,1.9,4.5,3.1,6.7
    c1.1,2.3,3.6,3.4,5.7,4.5c2.9,0.1,6.2,0.1,8.7-1.8c2.4-1.8,3.9-4.6,5-7.4c1.1-3-0.2-6.2-1.8-8.8c5.6-0.5,10.9-2.3,16.2-3.9
    c-2.7,6.5-7.5,12-10.1,18.6c-2.8,5.4-5.4,10.8-7.5,16.5c-3.7,8.8-6,18.4-11.6,26.3c-0.7,0.9-1.6,2-2.8,2.1
    c-3.8,0.4-7.3-2.4-8.9-5.7c-1.6-5.5-1.6-11.4-1.5-17.1c0.3-6.4,0.5-12.7,1.1-19.1c0.5-7.7-0.6-15.6,1.5-23c-3.1,0.5-6.1,1-9.2,1.7
    c-4.3,0.9-8.9,0.9-13,2.8c-0.6,1.7-0.8,3.5-0.9,5.2c-7.5-3.6-16.8-3.3-24,1.1c-3.2,2.8-6.4,5.7-8.6,9.4c-2.6,3.9-4.2,8.3-5.9,12.7
    c-1.2,3.8-1.7,7.8-2.6,11.7c-1.4,6.6-0.8,13.4-1.6,20.1c-0.5,5.5,0.5,11.2-0.8,16.7c-2.4,1.4-6.7,2.2-7.8-1.2
    c-2.6-8.4-1.7-17.2-2.3-25.9c0-7,0.1-14-0.6-21c-0.5-3.9-2.2-7.6-5.1-10.3c-3.1-2.9-6.9-5.7-11.4-5.6c-6.5-0.5-12.4,2.9-17.3,6.8
    c-3,2.1-6,4.4-8.3,7.3c-1.5-1.9-2.9-4.2-5.3-5c-2.9-1.4-6.2-0.6-9.3-0.7c-1.9-0.1-3.6,0.7-5.4,1.2c-5.4,1.6-10.4,4.3-15,7.4
    c0.2-2.3,0.5-4.5,0.8-6.8c-2,0.4-3.9,1.1-5.8,1.6c-6.2,1.3-12.1,3.9-18.4,5.1c-0.6,3.5-0.5,7-0.6,10.6c-3.3,1.2-6.7,2.5-10.1,3.5
    c-1-7.1-0.3-14.3-0.5-21.4c-0.1-6.8,0.6-13.6,0.8-20.4c-0.2-4.7-0.3-9.4,0-14c0.2-9.4,0.3-18.7,1-28.1c1-7.5,0.1-15,0.8-22.5
    c-1.8-0.3-3.7-0.3-5.5-0.6c-6.5-1.1-13.1,0.3-19.4,1.9c-4.6,1.5-9.5,2.6-13.5,5.5c-4,2.8-8.5,5-12.1,8.4c-1.9,1.9-3.4,4.2-5.3,6.2
    c-8,8-14.1,17.5-20.3,26.9c-3.4,4.9-5.7,10.4-8.9,15.4c-6.8,10.4-10.8,22.2-15.2,33.6c-6.3-0.2-12.7-0.1-19,0.7
    c-5.7,0.9-11.6,0.5-17.3,1.7c-3.9,0.5-7.9,0.5-11.8,1.5c-7.2,1.7-14.8,2.7-20.9,7.1c-4.5,2.7-8.8,6.1-11.4,10.8
    c-1.9,6.2-2.2,13.3,1,19.1c3.2,4.1,7.7,7.2,12.7,8.6c5.8,2.3,12.2,1.6,18.3,2.2c4,0.1,8-0.5,11.9-0.5c6.9,0.1,13.4-2.8,20.3-3.5
    c-5.2,20.4-9.6,41.1-12.5,62c-1,8.6-0.7,17.3,1.1,25.8c2,6.5,5.5,12.6,9.8,17.9c2.4,3,6.3,3.9,9.6,5.6c3.5,2,7.6,1.4,11.5,2.1
    c2.9,0.2,5.9-0.2,8.8,0.2c0.4-0.6,0.8-1.1,1.2-1.7c-0.7-2.7-2.4-5.1-3.3-7.7c-1.3-3.3-1.7-7-2.7-10.4c-1.9-5.7-2.4-11.7-3.1-17.7
    c-0.3-9.7,0.5-19.5,0.9-29.2c0.8-12.2,3.2-24.3,4.8-36.4c1.2-5.8,1.7-11.8,3.9-17.3c10.5-2,20.5-5.6,30.6-9
    c4.4-1.5,8.4-4.1,12.8-5.5c0.1,6.6-1.4,13.2-1.2,19.8c-0.2,10.9,0.1,21.7,0,32.6c0.3,4.9-0.9,9.7-0.7,14.6
    c-0.1,8.9-0.2,17.7-0.7,26.6c2.4,0.1,4.7-0.8,7-1.5c5.1-1.8,10.4-2.5,15.7-3.6c5.9-0.6,11.5-3,17.4-3.5c-0.7-4.9-0.5-9.8-0.4-14.8
    c0-3.2-0.3-6.3-0.2-9.5c0.5-7-0.1-14.1,0.6-21.1c0-8.1,1.1-16.1,1.5-24.2c1.2-7.4,0.7-15,2.4-22.3c3.3-1,6.3-2.5,9.5-3.8
    c-0.1,6.4-0.3,12.7,0,19.1c0.1,7.6-0.3,15.3-0.1,22.9c-0.7,5.7-0.7,11.5-1,17.2c0.1,1-0.2,2.4,0.8,3c5.4-1.1,10.6-2.9,16-4.1
    c1.4-0.4,2.8-1.1,4.2-1.6c2-3.3,0.4-7.2,0.9-10.8c0.5-5.3,0.3-10.7,0.2-16c0.2-4-0.1-8-0.2-12.1c0.1-6.6,1-13.1,2-19.7
    c0.6-4.9,3.8-9.9,8.9-11c1.5-0.3,3.2-0.9,4.6-0.2c2.4,2.4,2.7,6,3.2,9.1c0.6,7,0.8,14,1,21c-0.1,11.6,0.4,23.2-1,34.7
    c4.3-1.8,8.7-3.3,13.3-4.1c3.3-0.6,6.4-1.9,9.8-1.9c0.2-7,0.9-14,1.7-20.9c0.7-5.8,0.3-11.6,0.7-17.4c0.1-4.7,0.4-9.4-0.2-14
    c0.1-3.7-0.8-7.2-2.2-10.5c1.7-1.8,3.6-3.7,6.3-4.1c3.9-1.1,7.6,1.8,8.9,5.3c1.9,6.8,0.9,13.8,1,20.7c-0.1,5.4,1,10.6,1,16
    c0.1,5.2,0.2,10.7,3,15.3c1.2,1.9,3.4,2.3,5.3,3.1c3.1,1.3,6.6,1.2,9.9,0.9c3.9-0.5,8-1.7,10.9-4.6c2.5-2.6,5.2-5,7.7-7.7
    c1.6,3.6,5,6,8.4,7.8c3.9,1.3,8.3,0.9,12.1-0.5c7.6-2.7,14-8.2,18.7-14.7c1.8,3.3,4.8,6.5,8.6,7.2c6.3,0.1,12.3-1.8,18-4.3
    c-1.4,2.9-3.1,5.7-4.3,8.7c-0.5,0.8-0.1,1.6,0.8,1.9c3.8-2.7,7.3-6,11.7-7.9c8.7-5.1,19.4-7.1,29.3-4.8c5,0.9,9.7,2.8,14.8,3.5
    c10.2,2.4,20.6,3.9,31.1,4.7c6.2,0.7,12.3,1.5,18.5,2c6-0.2,11.9,0.5,17.9-0.2c6.6,0.3,13-1.2,19.4-2.7c3.7-1.1,7.4-2.4,11.2-3.2
    c3-0.5,5.6-2.2,8.4-3.3c6.2-2.3,11.5-6.3,17.2-9.5c9.1-5.3,15.6-14.1,19.9-23.5c1.8-3.3,2.5-7,3.6-10.5
    C600.7,102.9,599.5,98.8,598.7,94.8z M103,125.9c-2.8,6.5-4.7,13.4-6.4,20.3c-1.8,0.8-3.5,1.8-5.5,2.3c-11.5,2.2-23.7,3.3-35.1-0.3
    c-2.5-0.7-4.3-2.9-4.7-5.4c-0.3-2.1-1.2-4.2-0.4-6.3c1.8-4.8,6-8.3,10.7-10.3c8.1-4.1,17.3-4.8,26.1-5.6c5.7,0.1,11.5-0.4,17.2,0.2
    C104.4,122.5,103.8,124.2,103,125.9z M155.4,135.5c-6.2,2.3-12.6,3.6-18.9,5.4c-4.1,1.1-8.3,1.6-12.3,2.7c1-6.8,1.4-13.8,4.3-20.1
    c5.6,0,10.8,2.1,16.2,3.4c6.3,1.5,12.6,3,18.7,5.4C160.5,133.3,157.9,134.3,155.4,135.5z M169,87.3c0.1,9.9-0.5,19.8-1.5,29.7
    c-0.5,4.3-0.1,8.7-0.5,13c-3.9-1.4-7.6-3-11.3-4.8c-4.1-2.1-8.6-3.6-12.8-5.6c-4.2-1.8-8.6-2.9-13.1-3.6c0.5-4,2-7.7,2.8-11.7
    c3.1-9.4,6.2-18.8,10.2-27.8c3.5-7,6.6-14.2,11.5-20.4c5-5.9,9.3-12.8,16.2-16.7C170.8,55.4,169.5,71.3,169,87.3z M374.4,115.3
    c-0.1,4-0.3,8.1-1.2,12.1c-1.2,4.7-1.9,9.6-4.2,14c-3.1,5.6-12.5,5.6-15.8,0.2c-3-8.2-2.8-17.2-1.1-25.7c0.9-4,1.3-8.1,2.6-12
    c1-3.4,1.4-7.2,4-9.9c1.6-1.6,3.1-3.2,5-4.3c2-1.1,4.4-0.5,6.3,0.6c2.1,2.5,3.9,5.3,4.3,8.6C375.1,104.3,374.6,109.8,374.4,115.3z"
                  />
                  <path
                    className="st0"
                    d="M386.2,186.9c5.2-2.6,11.1-3.2,16.8-3.7c4.3-0.4,8.7,0.1,12.9,1c10,2.4,20.2,4.9,29,10.4
    c4.7,2.7,8.8,6.5,12.8,10.1c3.4,3.1,6.3,6.9,8,11.2c3.3,6.9-0.5,15.4-6.7,19.2c-7.2,3.6-16.2,3.2-23.1-0.8
    c-6.3-3.9-9.3-10.9-12.9-17.1c-2.3-4.7-4.8-9.5-8.4-13.3c-5.9-5.8-12.6-10.8-20.2-14.3C391.8,188.2,388.9,187.8,386.2,186.9
    L386.2,186.9z"
                  />
                  <path
                    className="st0"
                    d="M363.7,187.6c4,1,8.1,2.3,11.7,4.5c4.3,2.5,8.6,4.9,12.8,7.6c2.5,1.7,4.6,3.9,7,5.7c3.1,2.4,5.4,5.7,8.2,8.4
    c9,9.7,13.2,22.5,16.8,35c2.3,7.1,3.4,14.6,3.2,22.1c0.3,10.4-1.1,21.3-6.5,30.4c-1.9,2.7-3.3,6-6.2,7.8c-3.4,3-7.2,5.8-11.7,6.7
    c-6.2,0.4-12.6-1-17.6-4.8c-5.6-5-9.3-12.2-9.6-19.8c-0.1-5.5-0.3-11.3,1.8-16.6c1.1-3,1.9-6,3.4-8.8c2.9-6.3,5.4-12.7,7.1-19.4
    c1-4.8,0.8-9.8,1.2-14.6c-0.7-9.8-2.6-19.7-7.4-28.4c-2.4-3.7-4.8-7.5-8.1-10.5C367.8,191.2,365.5,189.7,363.7,187.6L363.7,187.6z"
                  />
                  <path
                    className="st0"
                    d="M240.5,195.8c1.9-1.1,3.7-2.6,5.7-3.6c-1,2.6-2.7,5.1-2.5,8c-1.5,9.7-0.1,19.6-1.1,29.3
    c0.1,9.9,1,19.7,0.6,29.6c8,2.7,16,5.1,24,7.9c4.1,0.7,8.8,0,12.2-2.4c1.6-1,1.6-3.3,3.4-3.9c-0.2,3.7-1.4,7.4-3.3,10.6
    c-2.2,3.2-6.3,4.2-9.9,4.8c-6.7,0.9-12.9-2.4-18.8-4.9c-5.3-2-10.4-5.1-16.2-5.4c-2.2-0.4-4.3,0.5-6.4,1.2c0.5-2.8,1.8-5.4,2.3-8.2
    c1.1-5.7,2.2-11.4,1.8-17.2c-0.3-6.1-0.4-12.2-1.1-18.2c-0.6-5.9-0.2-11.9-0.7-17.8c-5.1,3.2-8.7,8.8-8.8,14.9
    c0.5,3,1.3,6.2,3.9,8.2c-3.8,2-8.6-0.3-11.1-3.3c-1.6-3.7-1.8-8-0.4-11.8c1-3.4,3.8-5.7,6.4-7.8c3.2-2.5,7.2-3.4,10.7-5.3
    C234.2,198.9,237.5,197.6,240.5,195.8L240.5,195.8z"
                  />
                  <path
                    className="st0"
                    d="M358.8,212.6c-0.9-2.5-2.7-4.6-4.6-6.4c-1.2-1.3-2.8-2.5-3.2-4.3c-0.5-2.6,0.1-5.3,0.2-7.9
    c-3.5,3.5-8.2,6.1-13.2,6.4c-0.5,3.4-1.9,6.6-3.8,9.5c-1.4,2.3-4,3.5-6.3,4.6c0.5-4.1,0.1-8.5-2.4-12.1c-1.4-2.1-4.2-2.8-6.5-2.1
    c-3.7,1.1-7.5,1.9-10.7,4.1c0-3.9,0.4-7.9,0.4-11.8c-0.4-3-0.1-6-0.3-8.9c-2.4,1.4-4.4,3.6-7,4.8c-1.2,0.8-3.1,1.2-3.3,2.8
    c-1.1,4.4,0,9-0.3,13.5c-1.3,11,0.3,22-0.8,33c-0.4,2.5-1.2,5.3-3.7,6.4c-1.9,1.3-4.4,0.3-5.5-1.6c-2.4-3-1.5-7-1.4-10.5
    c-0.1-5.4,0.4-10.7,0.8-16.1c0.2-2.9,1.1-5.7,1.4-8.6c-4.7,1.9-9.7,3.6-14.9,3.4c0,0.4-0.1,1.3-0.2,1.8c-2.1-0.8-4.5-1.7-6.7-0.6
    c-6.7,3-10.8,9.6-13.8,16c-2.6,7.3-2.7,15.7,0.2,22.9c0.9,3.1,2.4,6.5,5.7,7.7c3.7,1.7,7.6,0,11.1-1.4c2.7-1.1,4.5-3.6,6.3-5.8
    c1.5,1,2.9,2.2,4.7,2.5c6.1,1.3,12.4-1.3,16.5-5.8c2.3,3.2,6.4,3.7,10,2.9c4.5-1.1,9.2-2.3,12.9-5.3c4.7-4.1,8.4-9.8,8.5-16.2
    c-0.2-2-0.5-3.9-0.2-5.9c1.8-0.6,3.7-1,5.3-1.9c4.1-2.9,6.7-7.4,8.6-11.9c2.5,3.2,3.8,7.1,5,10.9c1.2,2.8,2.3,5.7,2.8,8.8
    c-0.5,3.6-3.8,7.7-7.9,6.6c-1.3-0.2-1.9-1.6-2.7-2.5c3.1-1,6.4-3.1,7-6.6c0.7-2.5-0.6-6.4-3.7-6.1c-6.3,1.4-11,8.9-8.3,15
    c2.4,4.5,7.5,8.6,12.9,6.9c4.6-1.6,10-3.3,12.2-8.1C361.9,227.5,361.3,219.7,358.8,212.6z M274.2,240.6c-0.7,3.2-2.8,6-5.7,7.5
    c-1.8,0.9-4.4,0.5-5.2-1.5c-1.7-4.1-2.5-8.7-1.8-13.1c0.6-3.7,0.6-7.7,2.8-11c1.3-1.6,2.8-3.3,4.8-4.1c1.3-0.3,3.8-1,4.3,0.8
    C275.3,226.2,275.6,233.5,274.2,240.6z M319.3,226.3c-0.4,4.1-0.7,8.5-3.4,11.8c-1.3,1.6-3.4,2.6-5.5,2.5c-1.3-0.6-2.3-1.9-2.3-3.4
    c0-5.1,0.4-10.2,0.4-15.3c0.3-3,0-6,0.7-8.9c0.3-1.5,1.9-2.2,3.2-2.7c1.9-0.6,3.7,0.5,5.4,1.4C319.6,216.3,319.4,221.3,319.3,226.3
    z"
                  />
                </g>
              </svg>
            </Link>
            <p className="mt-8 text-white text-base leading-6">
              Drupal, Gatsby and React Development and Design
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {allMdx.edges.map(({ node }, index) => (
                <div className={index ? 'mt-12 md:mt-0' : ''} key={index}>
                  <h4 className="text-sm leading-5 font-semibold tracking-wider text-white uppercase m-0">
                    <Link to={node.frontmatter.path}>
                      {node.frontmatter.title}
                    </Link>
                  </h4>
                  {!!node.headings.length && (
                    <ul className="mt-4 list-none">
                      {node.headings.map(({ value }, index) => (
                        <li key={index}>
                          <Link
                            to={`${node.frontmatter.path}#${slugify(value)}`}
                            className="text-sm leading-6"
                          >
                            {value}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
