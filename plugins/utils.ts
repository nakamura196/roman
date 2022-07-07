// /plugins/logger.ts
export class Utils {
  getIdFromUriOld(uri: string): string {
    return uri.split('fact_')[1]
  }

  getIdFromUri(uri: string, delimiter: string = '/'): string {
    const tmp = uri.split(delimiter)
    return tmp[tmp.length - 1]
  }

  sortNodes(sortedNodes: any[], edgeMap: any, fromNode: string) {
    if (!edgeMap[fromNode]) {
      return sortedNodes
    }

    if (!sortedNodes.includes(fromNode)) {
      sortedNodes.push(fromNode)
    }

    const toNodes = edgeMap[fromNode]

    // まず入れる
    for (const toNode of toNodes) {
      if (!sortedNodes.includes(toNode)) {
        sortedNodes.push(toNode)
      }
    }

    // 各出ていくノードの先を再帰的処理
    for (const toNode of toNodes) {
      sortedNodes = this.sortNodes(sortedNodes, edgeMap, toNode)
    }

    return sortedNodes
  }

  getWordListByFactoid(xmlData: any, factoidId: string = ""){
    // widの一覧を取得する
    const ws = xmlData.querySelectorAll('w')
    const wids = []
    for (const w of ws) {
      const id = w.getAttribute('xml:id')
      wids.push(id)
    }

    let spans = []

    if(factoidId){
      spans = xmlData.querySelector('spanGrp').querySelectorAll(`span[*|id='${factoidId}']`)
    } else {
      spans = xmlData.querySelector('spanGrp').querySelectorAll('span')
    }

    const wordListByFactoid: any = {}

    for (const span of spans) {
      const spanId = span.getAttribute('xml:id')

      const type = span.getAttribute('type')

      const from = span.getAttribute('from').slice(1)
      const to = span.getAttribute('to').slice(1)

      const indexFrom = wids.indexOf(from)
      const indexTo = wids.indexOf(to)

      const note = span.querySelector('note').textContent

      for (let index = indexFrom; index <= indexTo; index++) {
        const id = wids[index]
        if (!wordListByFactoid[id]) {
          wordListByFactoid[id] = []
        }
        wordListByFactoid[id].push({
          id: spanId,
          type,
          note,
        })
      }
    }

    console.log({wordListByFactoid})

    return wordListByFactoid
  }

  createFactoidTitleFromId(factoidId: any) {
    if(!factoidId){
      return ""
    }
    return factoidId.replace('f_', 'Fact ')
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
