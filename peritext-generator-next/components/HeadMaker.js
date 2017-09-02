import React from 'react';
import Head from 'next/head'

export default ({
  title = '',
  authors= [],
  tags=[],
  description = '',
  url = '',
  children,
}) => {
    const authorsStr = authors.map(author => author.given + ' ' + author.family).join(', ');
    
    return (
      <Head>
        <title>{title}</title>
        <meta name="generator" content="peritext"/>
        {/*<!-- META DUBLIN CORE -->*/}
        <meta name="DC.Title" lang="fr" content={title} />
        <meta name="DC.Date.created" schema="W3CDTF" content={new Date().toISOString()} />
        {
          // tags.map((thatTag, index) => <meta key={index} name="DC.subject" xml:lang="en-GB" content={thatTag} />)
        }
        {/*<!-- END META DUBLIN CORE -->*/}

        {/*<!-- REGULAR META -->*/}
        <meta name="author" content={authorsStr}/>
        <meta name="keywords" content={tags.join(',')}/>
        <meta name="description" content={description} />
        <meta name="viewport" content="user-scalable=no,width=device-width" />
        {/*<!-- END REGULAR META -->*/}

        {/*<!-- META TWITTER -->*/}
        <meta name="twitter:card" value="summary" />
        <meta name="twitter:site" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/*<!-- todo : Twitter Summary card images must be at least 200x200px -->*/}
        {/*<meta name="twitter:image" content="https://ovide.surge.sh/apple-touch-icon.png">*/}
        {/*<!-- end meta twitter-->*/}

        {/*<!-- META GOOGLE + -->*/}
        <meta itemProp="name" content={title} />
        <meta itemProp="description" content={description} />
        {/*<meta itemProp="image" content="https://peritex.surge.sh/bulgur-rs.png">*/}
        {/*<!-- END META GOOGLE + -->*/}

        {/*<!-- META OPEN GRAPH / FACEBOOK -->*/}
        <meta property="og:title" content={title}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={url}/>
        <meta property="og:description" content={description}/>

        {/*<meta property="og:image" content="https://ovide.surge.sh/ovide-rs.png"/>
        <meta property="og:image:width" content="1200"/>
        <meta property="og:image:height" content="900"/>*/}
        {/*<!-- END META OPEN GRAPH / FACEBOOK -->*/}
        {children}
      </Head>
    )
}