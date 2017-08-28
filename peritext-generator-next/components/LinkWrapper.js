import React from 'react';
import Link from 'next/link';

export default ({
  to,
  as,
  query = {},
  title
}) => {
  let queryString = Object
            .keys(query)
            // .filter(quer => quer !== 'id')
            .map(quer => 
              quer + '=' + query[quer]
            )
            .join('&');
  queryString = queryString.length > 0 ? '?' + queryString : '';
  const idSuffix = query.id ? '/' + query.id : '';
  const asFinal = '/' + (as || to) + idSuffix + queryString;
  const toFinal = '/' + to + queryString;
  return (
    <Link 
      href={toFinal} 
      as={asFinal}
    >
      <a>{title}</a>
    </Link>
  );
}