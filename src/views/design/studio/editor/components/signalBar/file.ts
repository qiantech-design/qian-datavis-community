import ExcelJS from 'exceljs'
import FileSaver from 'file-saver'

const checkImportData = (tableFields: string[], fields: string[]) => {
  return fields.some(field => tableFields.indexOf(field) > -1)
}

const findIndexOf = (obj, iterate, context) => {
  for (var index = 0, len = obj.length; index < len; index++) {
    if (iterate.call(context, obj[index], index, obj)) {
      return index
    }
  }
  return -1
}

// 导入xlsx文件
export const importXLSX = (params: any) => {
  return new Promise((resolve, reject) => {
    if (!params) {
      return reject('参数不能为空')
    }
    const { file, columns } = params
    const fileReader = new FileReader()
    fileReader.onerror = () => {
      // 报错
    }
    fileReader.onload = event => {
      const tableFields: string[] = []
      columns.forEach(column => {
        const field = column.label
        if (field) {
          tableFields.push(field)
        }
      })
      // 读取文件内容
      const workbook = new ExcelJS.Workbook()
      const readerTarget = event.target
      if (readerTarget) {
        workbook.xlsx.load(readerTarget.result as ArrayBuffer).then(wb => {
          const firstSheet = wb.worksheets[0]
          if (firstSheet) {
            const sheetValues = Array.from(firstSheet.getSheetValues()) as string[][]
            // 返回对象第一个索引值
            const fieldIndex = findIndexOf(sheetValues, list => list && list.length > 0)
            const fields = sheetValues[fieldIndex] as string[]
            const status = checkImportData(tableFields, fields)
            if (status) {
              // 处理完数据,然后回调给用户处理
              const records = sheetValues.slice(fieldIndex + 1).map(list => {
                const item: any = {}
                list.forEach((cellValue, cIndex) => {
                  item[fields[cIndex]] = cellValue
                })
                const record: any = {}
                columns.forEach((site: any) => {
                  const field = site.label
                  const prop = site.prop
                  const data = typeof item[field] == 'undefined' ? null : item[field]
                  record[prop] = data && data.richText ? data.richText.map((a: any) => a.text).join('') : data
                })
                return record
              })
              // 转换数据

              resolve(records)
            } else {
              // 报错处理
              reject(new Error('导入数据不符合要求'))
            }
          } else {
            // 报错处理
            reject(new Error('导入数据不符合要求'))
          }
        })
      } else {
        // 报错处理
        reject(new Error('导入数据不符合要求'))
      }
    }
    fileReader.readAsArrayBuffer(file)
  })
}
// 导出excel数据
export const exportXLSX = (params: any) => {
  const { options, columns, content } = params
  const fileName = `${options.fileName}.${options.type}` || `file.${options.type}`
  // 创建 excel
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('sheet1')
  const header = columns.map(column => column.label)
  worksheet.addRow(header)
  // 设置宽度
  columns.forEach((column, index) => {
    worksheet.getColumn(index + 1).width = 30
  })
  // 填入数据
  content.data.forEach((item: any) => {
    const rows = [] as any[]
    columns.forEach((column: any) => {
      rows.push(item[column.prop])
    })
    worksheet.addRow(rows)
  })
  // 导出为文件
  workbook.xlsx.writeBuffer().then(data => {
    FileSaver.saveAs(new Blob([data], { type: '' }), fileName)
  })
}
// 导入json数据
const importJson = (params: any) => {
  return new Promise((resolve, reject) => {
    if (!params) {
      return reject('参数不能为空')
    }
    const { file, columns } = params
    // 读取文件内容
    const fileReader = new FileReader()
    fileReader.onerror = () => {
      // 报错
      reject('解析错误')
    }
    fileReader.onload = event => {
      const parseData = JSON.parse(event.target.result)
      const records = parseData.data.map((item: any) => {
        const record: any = {}
        columns.forEach(site => {
          record[site.prop] = typeof item[site.prop] == 'undefined' ? null : item[site.prop]
        })
        return record
      })
      resolve(records)
    }
    fileReader.readAsText(file)
  })
}
// 导出json数据
const exportJson = (params: any) => {
  const { options, content } = params
  if (options.type === 'json') {
    // 导出json数据
    const data = JSON.stringify(content.data)
    const fileName = `${options.fileName}.${options.type}` || `file.${options.type}`
    FileSaver.saveAs(new Blob([data], { type: 'text/plain;charset=utf-8' }), fileName)
  }
}

// 导入
export const handleImport = (params: any) => {
  return new Promise(async (resolve, reject) => {
    if (params.options.type === 'xlsx') {
      const res = await importXLSX(params)
      resolve(res)
      return
    }
    const res = await importJson(params)
    resolve(res)
  })
}

// 导出
export const handleExport = (params: any) => {
  if (params.options.type === 'xlsx') {
    exportXLSX(params)
    return
  }
  exportJson(params)
}
