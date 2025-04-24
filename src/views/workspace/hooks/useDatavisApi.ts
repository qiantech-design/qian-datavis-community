import datavisApi from '@/api/datavisApi'
export const useDatavisApi = () => {
  // file
  const uploadFiles = async (files: any, options: any) => {
    if (!files.length) {
      return ({ data: { result: 0, data: {} } })
    }
    const { folder } = options
    const formData = new FormData()
    formData.append('folder', folder)
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }
    return await datavisApi.file.upload(formData)
  }
  const getFile = async (data: any) => {
    return datavisApi.file.getFile(data)
  }
  const getJson = async (data: any) => {
    return datavisApi.file.getJson(data)
  }

  // resource
  const getResource = async (data: any) => {
    return datavisApi.resource.list(data)
  }
  const saveResource = async (data: any) => {
    return datavisApi.resource.save(data)
  }
  const deleteResource = async (data: any) => {
    return datavisApi.resource.delete(data)
  }
  const getByIdResource = async (data: any) => {
    return datavisApi.resource.getById(data)
  }

  // folders
  const getFolders = async (data: any) => {
    return datavisApi.folders.list(data)
  }
  const deleteFolders = async (data: any) => {
    return datavisApi.folders.delete(data)
  }
  const getWholeTree = async (data: any) => {
    return datavisApi.folders.wholeTree(data)
  }
  const saveFolders = async (data: any) => {
    return datavisApi.folders.save(data)
  }
  return {
    fileService: datavisApi.fileService,
    // 文件接口
    uploadFiles,
    getFile,
    getJson,
    // 文件夹接口
    getWholeTree,
    getFolders,
    saveFolders,
    deleteFolders,
    // 资源
    getByIdResource,
    getResource,
    saveResource,
    deleteResource,
  }
}