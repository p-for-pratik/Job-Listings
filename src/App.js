import React, { useState, useEffect } from "react";
import { Box, Button, CircularProgress, Grid, ThemeProvider } from "@material-ui/core";
import theme from "./theme/theme.js";
import Header from "./components/Header"
import Searchbar from "./components/Searchbar/index.js";
import JobCard from "./components/Job/Jobcard.js";
import NewJob from "./components/Job/NewJob";
import { firestore,app } from "./firebase/config";
import {Close as CloseIcon} from '@material-ui/icons'
import ViewJobModel from "./components/Job/ViewJobModel.js";
export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [newJobModal, setNewJobModal] = useState(false);
  const [viewJob, setViewJob] = useState({});
  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location",'==',jobSearch.location)
      .where("type",'==',jobSearch.type)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };



  const postJob= async (jobDetails)=> {
    await firestore.collection('jobs').add({
    ...jobDetails,
    postedOn: app.firestore.FieldValue.serverTimestamp (),
    });
    fetchJobs();
    };
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openNewJobModal={()=>setNewJobModal(true)} />
      <NewJob closeModal={()=>setNewJobModal(false)}  newJobModal={newJobModal} postJob={postJob}/>
      <ViewJobModel job={viewJob} closeModal={()=>setViewJob({})} />
      <Box mb={3}>
      <Grid container justify="center">

        <Grid item xs={10}>
          <Searchbar fetchJobsCustom={fetchJobsCustom} />
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
            {customSearch&&(
              <Box display="flex" justifyContent="flex-end" my={2}>
                <Button onClick={fetchJobs}>
                  <CloseIcon size={20}/>
                  Custom Search
                </Button>
              </Box>
            )}
            {jobs.map((job) =>(<JobCard open={()=>setViewJob(job)} key={job.id} {...job} />

            ))}
            </>
          )}



        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
};
