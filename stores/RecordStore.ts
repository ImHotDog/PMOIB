//PMOIB headers + urls
// const headersDefault: {'Authorization': string, 'Content-Type': string} = { 
//     'Authorization': 'Bearer 2b0c82946428f4af062dd0ade34eef39e7d995ed2aa073abd73685bb967fc0a89050b86f5885a7f90c88a7aa71e853a1ccf00a657201f49a46ba56417b68f2d9ad1ddd30aafed2af025cc94d45bafe17842ce48121ab9eed06f7facb4fc3313ce6b43c441c9f9d4cf9caf1ffec00099565261093e198eaaad29d59dee4a88e46',
//     'Content-Type': 'application/json'
// }

// const headersAttachments: {'Authorization': string} = { 
//     'Authorization': 'Bearer 2b0c82946428f4af062dd0ade34eef39e7d995ed2aa073abd73685bb967fc0a89050b86f5885a7f90c88a7aa71e853a1ccf00a657201f49a46ba56417b68f2d9ad1ddd30aafed2af025cc94d45bafe17842ce48121ab9eed06f7facb4fc3313ce6b43c441c9f9d4cf9caf1ffec00099565261093e198eaaad29d59dee4a88e46'
// }

// const uri: string = 'http://10.10.42.203:1337/api/documents/'

// const attachmentUri: string = 'http://10.10.42.203:1337/api/documents?populate=*'

// const deleteAttachmentUri: string = 'http://10.10.42.203:1337/api/upload/files/'

// const documentsModelUri: string = 'http://10.10.42.203:1337/api/content-type-builder/content-types/api::document.document'

// const comundaUri: string = 'http://localhost:8010/proxy/bpmn/v1/process/instance'

//Local headers + urls
const headersDefault: {'Authorization': string, 'Content-Type': string} = { 
    'Authorization': 'Bearer 804ae434e890f8c8e4bdc88fc3b400dc98e0f226e7d79687b5115de6f28d8cb710f7f56275b2a4a33a01f896a2388de3928e54229fc5c5e66b14d75e5c26892a2ddcf23f53f2d5574b89eca44b6387992a1e3f92619f3a0a9d821a521288a7a1a21c44f81f70b91b8c6366a2cbbc8ee98cf7c7e3e15e52e8e0054408719c2f65',
    'Content-Type': 'application/json'
}

const headersAttachments: {'Authorization': string} = { 
    'Authorization': 'Bearer 804ae434e890f8c8e4bdc88fc3b400dc98e0f226e7d79687b5115de6f28d8cb710f7f56275b2a4a33a01f896a2388de3928e54229fc5c5e66b14d75e5c26892a2ddcf23f53f2d5574b89eca44b6387992a1e3f92619f3a0a9d821a521288a7a1a21c44f81f70b91b8c6366a2cbbc8ee98cf7c7e3e15e52e8e0054408719c2f65'
}

const uri: string = 'http://localhost:1337/api/documents/'

const attachmentUri: string = 'http://localhost:1337/api/documents?populate=*'

const deleteAttachmentUri: string = 'http://localhost:1337/api/upload/files/'

const documentsModelUri: string = 'http://localhost:1337/api/content-type-builder/content-types/api::document.document'


interface IRecord {
    id: number,
    attributes: IRecordAttributes
}

// interface IRecordAttachments {
//     data: IRecordAttachmentsData[] | null
// }


interface IRecordAttachmentsData {
    id: number,
    attributes: IAttachmentsAttributes
}

interface IAttachmentsAttributes {
    name: string,
	url: string
}
interface IRecordAttributes {
    GUID: string,
    status: string, 
    approvalDate?: string,
    name: string,
    description: string,
    number: number,
    link: string,
    //attachments: IRecordAttachments,
    attachments: IRecordAttachmentsData[]
}

interface IRecordStore {
    record: IRecord,
    loading: boolean,
    pageMode: string
}

const defaultValue: IRecordStore = {
    record: {} as IRecord,
    loading: false,
    pageMode: 'View'
}

export const useRecordStore = defineStore('recordStore', {

    state: () => defaultValue,
    
    getters: {
    },
    
    actions: {
        changePageMode(){

            if(this.pageMode === 'View'){

                this.pageMode = 'Edit'

            } else {

                this.pageMode = 'View'
           
            }
        },
        async getRecord(id: number){

            this.loading = true

            const res = await fetch(uri + id + '?populate=*', {
                headers: headersDefault,
                method: 'GET'
            })

            const { data } = await res.json()

            const dateFromString = new Date(data.attributes.approvalDate)
            const formDate = `${('0' + dateFromString.getDate()).slice(-2)}.${('0' + (dateFromString.getMonth() + 1)).slice(-2)}.${dateFromString.getFullYear()} ${('0' + dateFromString.getHours()).slice(-2)}:${('0' + dateFromString.getMinutes()).slice(-2)}`

            this.loading = false

            const recordResult: IRecord = {
                id: data.id,
                attributes: {
                    GUID: data.attributes.GUID, 
                    status: data.attributes.status,
                    approvalDate: data.attributes.approvalDate ? formDate : '',
                    name: data.attributes.name,
                    description: data.attributes.description,
                    number: data.attributes.number,
                    link: data.attributes.link,
                    attachments: data.attributes.attachments.data ? data.attributes.attachments.data.map((itemAtt: IRecordAttachmentsData) => {
                        return {
                            id: itemAtt.id,
                            attributes: {
                                name: itemAtt.attributes.name,
                                url: 'http://localhost:1337' + itemAtt.attributes.url,
                            }
                        }
                    }) : null
                } 
            }
            this.record = recordResult

            return recordResult
            
        },
        async createRecord(status: string, name: string, description: string, number: number, link: string, fileList: FileList){
            
            //without attachments
            // const document =  await fetch(uri, {
            //     headers,
            //     method: 'POST',
            //     body: JSON.stringify({
            //         data: {
            //             status: status,
            //             name: name,
            //             description: description
            //         }
            //     }),
            // })
           

            //with attachments
            let formData: any = new FormData();

            const data = {
                status: status,
                name: name,
                description: description,
                number: number, 
                link: link
            }
           
            formData.append("data", JSON.stringify(data))
            
            if (fileList){
                const filesArray: File[] = Array.from(fileList)
                filesArray.map((item) => {
                    formData.append("files.attachments",  item)
                })

            }
     
            const newDocument = await fetch(uri, {
                method: "POST",
                headers: headersAttachments,
                body: formData
            });

            const newDocumentParsed = await newDocument.json()
            await navigateTo(`/developmentdocuments/${newDocumentParsed.data.id}`)
            
        },
        async editRecord(status: string, name: string, description: string, id: number, number: number, link: string, fileList: FileList){
            
            //without attachments
            // const document =  await fetch(uri + id, {
            //     headers,
            //     method: 'PUT',
            //     body: JSON.stringify({
            //         data: {
            //             status: status,
            //             name: name,
            //             description: description
            //         }
            //     }),
            // })

            // const { data } = await document.json()

            // this.record = data
            // this.pageMode = 'View'


            //with attachemnts
            const formData: any = new FormData();

            const data = {
                status: status,
                name: name,
                description: description,
                number: number, 
                link: link

            }
           
            formData.append("data", JSON.stringify(data))

            if (fileList){
                const filesArray: File[] = Array.from(fileList)
                filesArray.map((item) => {
                    formData.append("files.attachments",  item)
                })

            }
     
            const modifiedDocument = await fetch(uri + id, {
                method: "PUT",
                headers: headersAttachments,
                body: formData
            });

            const modifiedDocumentParsed = await modifiedDocument.json()

            this.getRecord(modifiedDocumentParsed.data.id)
            await navigateTo(`/developmentdocuments/${modifiedDocumentParsed.data.id}`)
            this.pageMode = 'View'
        
        },
        async deleteAttachment(recordId: number, attachmentId: number){
            
            const deletedDocument = await fetch(deleteAttachmentUri + attachmentId, {
                method: "DELETE",
                headers: headersAttachments,
            });
            this.getRecord(recordId)
            //await navigateTo(`/developmentdocuments/${recordId}`)
            this.pageMode = 'View'

        },
        //Works only in PMOIB(comment if local)
        // async comundaSendAction(id: number, attachemnts: boolean){
            
        //     const document =  await fetch(comundaUri, {
        //         headers: headersDefault,
        //         method: 'POST',
        //         body: JSON.stringify({
        //             uuid: "66a0517c-e6ac-11ee-a235-266d4b07c1b2",
        //             entity: "PMOIB",
        //             event: "StatusTime",
        //             object: {
        //                 id: id,
        //                 attachments: attachemnts
        //             }
        //         }),
        //     })
        //     await reloadNuxtApp()
        // },
    }
})