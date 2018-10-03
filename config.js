module.exports = {
	port:process.env.PORT || 8080,
	// db: process.env.MONGODB || 'mongodb://40.124.41.46:27017/LogistikGO_XD',
	db: process.env.MONGODB || 'mongodb://admin:R9VdEsuAXRY3@ds131902.mlab.com:31902/logistikgo_xd_demo',
	// db: process.env.MONGODB || `mongodb://logistikgo:7qcviPCAzXqhWYg4eaTwKlD5gme0oVavey3QjXZtx75XOc5t8ODNHkPbgFL6tIqIZFZRIvUNNW9fgxSDlDyByg%3D%3D@logistikgo.documents.azure.com:10255/logistikgo_xd?ssl=true&replicaSet=globaldb`,	
}