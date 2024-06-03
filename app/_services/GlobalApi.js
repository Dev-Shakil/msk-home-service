const { gql, default: request } = require("graphql-request");

const MASTER_URL = "https://api-ap-south-1.hygraph.com/v2/cltd34b8c3le807usuqw3dww0/master";

const getCategory = async () => {
    try {
        const query = gql`
            query Category {
                categories {
                    id
                    name
                    bgcolor {
                        hex
                    }
                    icon {
                        url
                    }
                }
            }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching category:", error);
        throw error; // Rethrow the error if needed
    }
};
const getBusinessList = async () => {
    try {
        const query = gql`
        query BusinessList {
            businessLists {
              about
              address
              category {
                name
              }
              contactPerson
              email
              id
              image {
                url
              }
              name
            }
          }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching BusinessList:", error);
        throw error; // Rethrow the error if needed
    }
};
const getBusinessByCategory = async (category) => {
    try {
        const query = gql`
        query BusinessByCategory {
            businessLists(where: {category: {name: "`+category+`"}}) {
              about
              address
              category {
                name
              }
              contactPerson
              email
              id
              image {
                url
              }
              name
            }
          }
        `;

        const result = await request(MASTER_URL, query);
        return result;
    } catch (error) {
        console.error("Error fetching BusinessList:", error);
        throw error; // Rethrow the error if needed
    }
};
const getBusinessById =async (id) => {
  try {
    const query = gql`
    query BusinessListById {
      businessList(where: {id: "${id}"}) {
        about
        address
        email
        id
        image {
          url
        }
        name
        contactPerson
        category {
          name
        }
      }
    }
    `;

    const result = await request(MASTER_URL, query);
    return result;
} catch (error) {
    console.error("Error fetching BusinessList:", error);
    throw error; // Rethrow the error if needed
}
}
const createNewBooking = async (businessId,date,time,userEmail,userName,)=>{
  console.log(businessId,date,time,userEmail,userName)
  try {
  const mutationQuery = gql`
  mutation CreateBookig {
    createBooking(
      data:{bookingStatus: Booked,businessList: {connect: {id: "`+businessId+`"}},date: "`+date+`", time: "`+time+`",userEmail: "`+userEmail+`",userName: "`+userName+`",  }
    ) {
      id
    }
    publishManyBookings(to:PUBLISHED){
      count
    }
  }`
  const result = await request(MASTER_URL, mutationQuery,{
    headers: {
      "authorization": `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3MTUwMjI4OTUsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmh5Z3JhcGguY29tL3YyL2NsdGQzNGI4YzNsZTgwN3VzdXF3M2R3dzAvbWFzdGVyIiwibWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQtYXAtc291dGgtMS5oeWdyYXBoLmNvbS8iLCJzdWIiOiJkZGMwYzk0OC1mOGVmLTQ4MmMtODI0Yi1lZjllOTY1YjBjNWYiLCJqdGkiOiJjbHZ2Y2NuYzkxOTU4MDdwY2U0MzljeG82In0.W7nzBimhprVo418cTPTJ-eKBfgHBJACsMn5L8E-mzzo3QuyHkJ2IrORw1BvKTvYw3--1AZp_bNsub4yE58oLwr7bimt9h4tq093Nr5WVo9eh_nlVpZpJTqD_JFQ_cFR1Nb1lDKiztZ2WQgt7_zUXrgGRMlu7CFN2XVedEX21O2zII52ig1RQiew0ukODoOnxsiQHOPCagvvSDnlCp-SYuq3dlAk65f6hQqfeVMemiWFWIOyDK5kvWEwzCwdc5QAdbqerBH7NhrFylb5YscsEiOTs5z0zvOlaGnvnXB203_hh0iJ6MG0E8fysFdje-iIA0lm_P75LaxCGslR1kj3YBa5jUgozjU7Ps3R8iRiDernqhv5mxJmaGabZ2cyYVNI6R6CN4r7I81GfjgAWNlE7K8TAYPYYTFPlTaMlius9w11ZhKkChI9G2JJILwc5hhp2YpVg8Przshll-Hr5C6i61TRSxoQwdQhL2LsJ7LFH1iKm0DNzM8c-c7j6VgNvmfPZ6ARLm6hMZNlyiZucHP-DRcGblhzEsdVO1T4GlokdADwEcFBUBo9XiPYXzsQUa0Du33HWeHARVBs8zxbYJuF-b9PS8yc5aX-8xwVxeY0ORlb_k86NMKv2Y-VBoS7LSXzRlN2ASgaj86slr_wzKdTZ5aO6PUQbkGRGT0MjhUnu3lk`
    },
  });


    console.log(result)
    return result;
  } catch (error) {
    console.error("Error Posting Booking:", error);
    throw error; // Rethrow the error if needed
}
}
const BusinessBookedSlot = async (businessId,date) => {
  try{
    const query = gql`
    query BusinessBookedSlot {
      bookings(where: {businessList: {id: "${businessId}"}, date: "${date}"}) {
        date
        time
      }
    }
    
    `
    const result = await request(MASTER_URL, query);
  
  
      console.log(result)
      return result;
  }catch(error){
    console.log(error)
  }
}
const getUserBookingHistory = async (userEmail) => {
  try{
    const query = gql`
      query  {
        bookings(where: {userEmail: "${userEmail}"},
          orderBy: publishedAt_DESC
        ) {
          businessList {
            name
            image {
              url
            }
            contactPerson
            address
          }
          date
          time
        }
      }
    `
    const result = await request(MASTER_URL, query);
  
  
      console.log(result)
      return result;
  }catch(error){
    console.log(error)
  }
}
export default{
    getUserBookingHistory,
    getCategory,
    getBusinessList,
    getBusinessByCategory,
    getBusinessById,
    createNewBooking,
    BusinessBookedSlot,
}