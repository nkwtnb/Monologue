const url = "https://qiita.com/ksyunnnn/items/bfe2b9c568e97bb6b494";

fetch(url).then(res => res.text()).then(text => {
    const el = new DOMParser().parseFromString(text, "text/html")
    const headEls = (el.head.children)
    Array.from(headEls).map(v => {
        const prop = v.getAttribute('property')
        if (!prop) return;
        console.log(prop, v.getAttribute("content"))
    })
})
