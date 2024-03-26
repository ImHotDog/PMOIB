//PMOIB headers + urls
// const headers: {'Authorization': string, 'Content-Type': string} = { 
//     'Authorization': 'Bearer 2b0c82946428f4af062dd0ade34eef39e7d995ed2aa073abd73685bb967fc0a89050b86f5885a7f90c88a7aa71e853a1ccf00a657201f49a46ba56417b68f2d9ad1ddd30aafed2af025cc94d45bafe17842ce48121ab9eed06f7facb4fc3313ce6b43c441c9f9d4cf9caf1ffec00099565261093e198eaaad29d59dee4a88e46',
//     'Content-Type': 'application/json'
// }

// const uri: string = 'http://10.10.42.203:1337/api/documents/'


// const uriMainPages: string = 'http://10.10.42.203:1337/api/documents/?sort[0]=id:asc&filters[status][$eq]=Новый&pagination[page]='
// const uriAllPages: string = 'http://10.10.42.203:1337/api/documents/?sort[0]=id:asc&pagination[page]='

// const uriTotal: string = 'http://10.10.42.203:1337/api/documents/?sort[0]=id:asc&pagination[pageSize]=10000'

// const attachmentUri: string = 'http://10.10.42.203:1337/api/documents?sort[0]=id:asc&populate=*&pagination[page]='

// const documentsModelUri: string = 'http://10.10.42.203:1337/api/content-type-builder/content-types/api::document.document?sort[0]=id:asc'

//Local headers + urls
const headers: {'Authorization': string, 'Content-Type': string} = { 
    'Authorization': 'Bearer 804ae434e890f8c8e4bdc88fc3b400dc98e0f226e7d79687b5115de6f28d8cb710f7f56275b2a4a33a01f896a2388de3928e54229fc5c5e66b14d75e5c26892a2ddcf23f53f2d5574b89eca44b6387992a1e3f92619f3a0a9d821a521288a7a1a21c44f81f70b91b8c6366a2cbbc8ee98cf7c7e3e15e52e8e0054408719c2f65',
    'Content-Type': 'application/json'
}

const uri: string = 'http://localhost:1337/api/documents/'

const uriMainPages: string = 'http://localhost:1337/api/documents/?sort[0]=id:asc&filters[status][$eq]=Новый&pagination[page]='
const uriAllPages: string = 'http://localhost:1337/api/documents/?sort[0]=id:asc&pagination[page]='

const uriTotal: string = 'http://localhost:1337/api/documents/?sort[0]=id:asc&pagination[pageSize]=10000'

const attachmentUri: string = 'http://localhost:1337/api/documents?sort[0]=id:asc&populate=*&pagination[page]='

const documentsModelUri: string = 'http://localhost:1337/api/content-type-builder/content-types/api::document.document?sort[0]=id:asc'

const headersDefault: {'Authorization': string, 'Content-Type': string} = { 
    'Authorization': 'Bearer 804ae434e890f8c8e4bdc88fc3b400dc98e0f226e7d79687b5115de6f28d8cb710f7f56275b2a4a33a01f896a2388de3928e54229fc5c5e66b14d75e5c26892a2ddcf23f53f2d5574b89eca44b6387992a1e3f92619f3a0a9d821a521288a7a1a21c44f81f70b91b8c6366a2cbbc8ee98cf7c7e3e15e52e8e0054408719c2f65',
    'Content-Type': 'application/json'
}



interface IDocumentStore {
    documents: IDocument[],
    meta: {
        pagination: {
            page: number,
            pageCount: number,
            pageSize: number,
            total: number
        }
    },
    loading: boolean,
    statusList: string[],
}

interface IDocument {
    id: number,
    attributes: IDocumentAttributes
}

interface IDocumentAttributes {
    GUID: string,
    status: string, 
    name: string,
}

const defaultValue: IDocumentStore = {
    documents: [] as IDocument[],
    meta: {
        pagination: {
            page: 1,
            pageCount: 1,
            pageSize: 25,
            total: 0
        }
    },
    loading: false,
    statusList: []
}

export const useDocumentStore = defineStore('documentStore', {

    state: () => defaultValue,
    
    getters: {
        // getAllRecordStatus: (state) => {
        //     const recordStatusArray = state.documents.map((record) => record.attributes.status)
        //     return [...new Set(recordStatusArray)]
        // },
        getDocumentsByStatus: (state) => {
            return (statusName: string) => state.documents.filter((item) => item.attributes.status === statusName)
        },
        getDocumentsWithStatusNew: (state) => {
            return state.documents.filter((item) => item.attributes.status === 'Новый')
        }

    },
    
    actions: {
        async getDocuments(page?: string){
            
            this.loading = true

            const res = await fetch(page == 'main' ? uriMainPages + this.meta.pagination.page : uriAllPages + this.meta.pagination.page, {
                headers
            })
            const data = await res.json()


            this.loading = false
            

            const documentsResult: IDocument[] = data.data.map((item : IDocument) => {
                return {
                    id: item.id,
                    attributes: {
                        GUID: item.attributes.GUID, 
                        status: item.attributes.status,
                        name: item.attributes.name,
                    },
                }
            })

            this.meta = {
                pagination: {
                    page: data.meta.pagination.page,
                    pageCount: data.meta.pagination.pageCount,
                    pageSize:data.meta.pagination.pageSize,
                    total: data.meta.pagination.total,
                }
            }


            this.documents = documentsResult
            
        },

        async getAllDocuments(){


            const { data }: any = await $fetch(uriTotal, {
                headers
            })

            const documentsResult: IDocument[] = data.map((item : IDocument) => {
                return {
                    id: item.id,
                    attributes: {
                        GUID: item.attributes.GUID, 
                        status: item.attributes.status,
                        name: item.attributes.name,
                    },
                }
            })

            this.documents = documentsResult
            
        },

        async deleteDocument(id: number){

            const deleteRecordOrError = await fetch (uri + id , {
            headers, 
            method: 'DELETE'
        })

            //this.documents = this.getDocuments()

            this.documents = this.documents.filter((el) => el.id !== id)
            await navigateTo('/developmentdocuments')

        },
        async getDocumentModel(){
            this.loading = true
            const { data }: any = await $fetch(documentsModelUri, {
                headers,
                method: 'GET'
            })
            this.loading = false
            this.statusList = data.schema.attributes.status.enum
            return data.schema.attributes.status.enum

            // this.statusList = data.schema.attributes.status.enum
            // this.loading = false

        }
    }
})