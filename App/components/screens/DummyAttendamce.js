<View>    
<Card style={styles.card}>  
<Text style={styles.head}>Attendance</Text>    
<DataTable style={styles.container}>
<DataTable.Header style={styles.tableHeader}>
  <DataTable.Title style={styles.title}>Attendance Date</DataTable.Title>
  <DataTable.Title style={styles.title}>Attendance</DataTable.Title>
 
</DataTable.Header>

    
               {attendance.length <= 0 ? <Text>No Data Found</Text> : attendance.map((att)=>{
      return(
       <DataTable.Row  >
  <DataTable.Cell>{att.attendanceDate
  }</DataTable.Cell>
  <DataTable.Cell style={styles.Row}>{att.attendance}</DataTable.Cell>

</DataTable.Row>
          )
  })}
     
      


</DataTable>
<View style={{ zIndex: -1,marginTop:-20 }}>
  <Card>
  <Card.Content style={styles.page}>
        <TouchableOpacity  onPress={() => handlePreviousPage()}>
      
          <Text>
            {" "}
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color="#0073A9"
            />
          </Text>
        </TouchableOpacity>
        <Text style={styles.page1}>{pageNumber} of {totalPages -1 }</Text>
        <TouchableOpacity onPress={() => handleNextPage()}>
          <Text>
            {" "}
            <MaterialIcons
              name="arrow-forward-ios"
              size={20}
              color="#0073A9"
            />
          </Text>
        </TouchableOpacity>
      </Card.Content>
  </Card>
  <Card>
    <Text></Text>
  </Card>
  <Card>
    <Text></Text>
  </Card>
  <Card>
    <Text></Text>
  </Card>
  <Card>
    <Text></Text>
  </Card>
</View>
</Card>
</View>