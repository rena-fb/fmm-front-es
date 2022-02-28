import React, {useState, useEffect} from "react"
import { useStaticQuery, graphql } from "gatsby"
import './CookiePupup.scss'

export default function CookiePopup({lang}) {
    const [hideCookieMessage, setHideCookieMessage] = useState(true);

    useEffect(()=> {
        setHideCookieMessage(JSON.parse(localStorage.getItem('acceptCookies')))
    },[])

    useEffect(()=> {
        window.addEventListener('storage', (event) => {
            if (event.storageArea !== localStorage) return;
            if (event.key === 'acceptCookies') {
                setHideCookieMessage(true)
            }
        });
    },[])

    const acceptCookie = ()=> {
        localStorage.setItem('acceptCookies', true)
        setHideCookieMessage(true)
    }

    const data = useStaticQuery(graphql`
        query {
            CookieMessage: allWpGenericBlock(
                filter: {
                    generic_block_data: { type: { eq: "CookieMessage" } }
                }
            ) {
                edges {
                    node {
                        title
                        content
                        fmmCore {
                            languageCode
                            frontendSlug
                        }
                    }
                }
            }
        }
    `)

    const componentData = data?.CookieMessage?.edges.find(item=> item?.node?.fmmCore?.languageCode === lang)

    return (
        <>
            {!hideCookieMessage && componentData?.node?.content &&
                <aside id="cookies-popup">
                    <section
                        dangerouslySetInnerHTML={{
                            __html: componentData?.node?.content
                        }}
                    />
                    <button className="button-ok-tc" onClick={acceptCookie}>Ok</button>
                </aside>
            }
        </>
    )
}
