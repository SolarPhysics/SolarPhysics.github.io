document.addEventListener('DOMContentLoaded', function() {
    const meetings = [
        // 2023-1st: 0-9 (10개)
        { date: '2023-09-08', presenter: 'Sibaek Yi', article: { title: 'A Model for the Sources of the Slow Solar Wind', url: 'https://arxiv.org/abs/1102.3704'}, video: 'TBD' },
        { date: '2023-09-15', presenter: 'Junmo An', article: { title: 'TBD', url: 'TBD'}, video: 'TBD'},
        { date: '2023-09-22', presenter: 'Jihye Kang', article: { title: 'Onset mechanism and a physics-based prediction of large solar flares', url: 'https://ui.adsabs.harvard.edu/abs/2021AGUFMSH23B..01K/abstract' }, video: 'TBD'},
        { date: '2023-10-06', presenter: 'Donghui Son', article: { title: 'On rising magnetic flux tube and formation of sunspots in a deep domain', url: 'https://arxiv.org/abs/2003.10583'}, video: 'TBD'},
        { date: '2023-10-13', presenter: 'Yeonwoo Jang', article: { title: 'A Framework for Detecting Polarity Inversion Lines from Longitudinal Magnetograms', url: 'https://ieeexplore.ieee.org/document/9377808'}, video: 'TBD'},
        { date: '2023-11-10', presenter: 'Hwanhee Lee', article: { title: 'Origin of the Wang-Sheeley-Arge solar wind model', url: 'https://hgss.copernicus.org/articles/8/21/2017/' }, video: 'https://khu-ac.zoom.us/rec/share/3I3bxvfs1K46M7tC0UtWozl6eEuuvdNIjwRNM2_q6Vlt1JY5IFW6VmAEDaeBoafj.NHLOBvawpYkdG_Kp'},
        { date: '2023-11-17', presenter: 'Yeongmin Kang', article: { title: 'Data-driven MHD simulation study of an inclined solar eruption in NOAA active region 11283', url: 'TBD' }, video: 'https://khu-ac.zoom.us/rec/share/UXKfj93JlHNoRZwn_F4Rxg-8rD-tUk-lbVARb744S3TXLLkHaKoWSk83ZxVg68MQ.yLydNWG3iVwPw3nN'},
        { date: '2023-11-24', presenter: 'Mingyu Jeon', article: { title: 'Probing the solar coronal magnetic field with physics-informed neural networks', url: 'https://www.nature.com/articles/s41550-023-02085-8' }, video: 'https://khu-ac.zoom.us/rec/share/IfOOGO1Oj0w7L-O7zjanmtCJ40ld6KCmBn3BtUgKo_ZlfLfzq7DAGehc6Xoq5EfL.nlC8VEiAVNNPTqgv'},
        { date: '2023-12-01', presenter: 'Hyunjin Jeong', article: { title: 'Rotation and interaction of the CMEs of September 8 and 10, 2014, tested with EUHFORIA', url: 'https://www.aanda.org/articles/aa/full_html/2023/07/aa45902-23/aa45902-23.html' }, video: 'https://khu-ac.zoom.us/rec/share/8M-6tyRGHj3ZxhWP1uiwyGEPEG6EAbGgjN0n7vpmXcTYXEmpVxQ80MOOvxvtZoxJ.HTpzFqJ3LcuQ_kld'},
        { date: '2023-12-08', presenter: 'Sunghong Park', article: { title: 'Testing the Alfvén-wave Model of the Solar Wind with Interplanetary Scintillation', url: 'https://ui.adsabs.harvard.edu/abs/2022ApJ...928..130S/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/F_2ueUqEWtt4nyWF8Ama2ScjWBAiGMR3Nr8TAER9qgx2nO6zmeOA_u1wTHTrwWBZ.1RIplgH_EL6wZa67'},
        
        // 2024-1st: 10-20 (11개)
        { date: '2024-01-12', presenter: 'Sibaek Yi', article: { title: 'The Thickness of Electric Current Sheets and Implications for Coronal Heating', url: 'https://arxiv.org/abs/2307.13825' }, video: 'TBD' },
        { date: '2024-01-19', presenter: 'Junmo An', article: { title: 'The Variations in Finite-difference Potential Fields: Models and Observations', url: 'https://arxiv.org/abs/2102.05618' }, video: 'https://khu-ac.zoom.us/rec/share/E0q1Wzl_BYkEiN-r8X2wSQyCCuFg6gewO-5oAuQREZ_DNbraJoXuCKd3WXqbhP49.RS_unTEpFm0fbH17' },
        { date: '2024-01-26', presenter: 'Jihye Kang', article: { title: 'Coronal Mass Ejections: A Deep Learning Approach to Generating Photospheric Vector Magnetograms of Solar Active Regions for SOHO/MDI Using SDO/HMI and BBSO Data and Effects', url: 'https://arxiv.org/abs/2211.02278' }, video: 'TBD'},
        { date: '2024-02-02', presenter: 'Donghui Son', article: { title: 'HOW-MHD: A High-Order WENO-Based Magnetohydrodynamic Code with a High-Order Constrained Transport Algorithm for Astrophysical Applications', url: 'https://arxiv.org/abs/2304.04360' }, video: 'TBD', ppt: 'https://drive.google.com/file/d/1sBFDK5NFLNJXIDOfrkGSt0s7tf4cUxLZ/view?usp=sharing'},
        { date: '2024-02-16', presenter: 'Yeonwoo Jang', article: { title: 'Testing magnetohydrostatic extrapolation with radiative MHD simulation of a solar flare', url: 'https://arxiv.org/abs/1910.03523' }, video: 'https://khu-ac.zoom.us/rec/share/q9BScJYobQVCmtOslqwzHzL2OsAttPAEKvC4Gvl1eN4D-_IPFYuG9xMSFCANbsRR.Lm2CguFzUpaTNxnk'},
        { date: '2024-02-23', presenter: 'Hwanhee Lee', article: { title: 'Ensemble Modeling of CME Propagation', url: 'https://ui.adsabs.harvard.edu/abs/2013SoPh..285..349L/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/AMDpo4or2Amp9i7er1du4sF-30zl-mMB_nhrRE-C3v4NpTv1LeLmKFZc8UjFOl5R.RKzGREJSFiiKrCRq?startTime=1708651658000'},
        { date: '2024-03-08', presenter: 'Yeongmin Kang', article: { title: 'Comparative Study of Data-driven Solar Coronal Field Models Using a Flux Emergence Simulation as a Ground-truth Data Set', url: 'https://arxiv.org/abs/2001.03721v1' }, video: 'TBD'},
        { date: '2024-03-15', presenter: 'Mingyu Jeon', article: { title: 'Advancing Solar Magnetic Field Extrapolations through Multiheight Magnetic Field Measurements', url: 'https://iopscience.iop.org/article/10.3847/2041-8213/ad2450' }, video: 'https://khu-ac.zoom.us/rec/share/6FYq1dqi80PRrAz3uc_t8JhHdiC9IWUSOuMHowRUFNdgyWoqHABt0-fkr7RY6469.E1Zk10W9wLAEr8pC', ppt: 'https://drive.google.com/file/d/1kS2z4SqhBdjieq75SGlmRX-O8D9-0VvD/view?usp=drive_link'},
        { date: '2024-03-22', presenter: 'Hyunjin Jeong', article: { title: 'First Insights into the Applicability and Importance of Different 3D Magnetic Field Extrapolation Approaches for Studying the Preeruptive Conditions of Solar Active Regions', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ad18bd' }, video: 'https://khu-ac.zoom.us/rec/share/1-ekoH44rObi6dlQkFVkdhX8Z5bufvWu3xoHLhrIR9pqK2c7noiAkp_y8kd2Fy47.gmnTfeL5PpULzlwD', ppt: 'TBD'},
        { date: '2024-03-29', presenter: 'Sunghong Park', article: { title: 'Magnetic Connectivity of the Ecliptic Plane within 0.5 au: Potential Field Source Surface Modeling of the First Parker Solar Probe Encounter', url: 'https://ui.adsabs.harvard.edu/abs/2020ApJS..246...23B/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/V_im5FfAIL5SrbCUfLX-pWuhwxlCv3xAO3O3fGZfQ5Eq8YZk3FnPcASJeFPv5UKF.tRmsAPKfOSTQ87Ca', ppt: 'TBD'},
        { date: '2024-04-05', presenter: 'Kyungsun Park', article: { title: 'Solar wind entry into Mercury\'s magnetosphere: Simulation results for the second swingby of BepiColombo', url: 'https://www.aanda.org/articles/aa/full_html/2024/01/aa47789-23/aa47789-23.html' }, video: 'https://khu-ac.zoom.us/rec/share/px94blvJpCYLoSoxivaOJEnYwBU48EYnuas-n9VawYVeRkoyh_TkEXRqSI9aKRv3.ftl6AfzbSTAGUlW9', ppt: 'https://drive.google.com/file/d/1_0-zmvJ1on_FzrJPeKXgt52L3zHnUhz-/view?usp=sharing'},
        
        // 2024-2nd: 21-28 (8개)
        { date: '2024-05-03', presenter: 'Sibaek Yi', article: { title: 'A Magnetogram-matching Method for Energizing Magnetic Flux Ropes Toward Eruption', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ac874e' }, video: 'https://khu-ac.zoom.us/rec/share/k8HjTO71M8cH5SCQ-PZQk5IhEVMf7_WqmJSCHtBeJxIpNaozBAqFzmf_B67nt0Wc.wVZ5xnaxtnU7i4an', ppt: 'TBD'},
        { date: '2024-05-10', presenter: 'Junmo An', article: { title: 'Proposed Resolution to the Solar Open Magnetic Flux Problem', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ad20e2' }, video: 'https://khu-ac.zoom.us/rec/share/Q0qdLNrNdhtdKGCrXQZf9IqVc0bVFbMufYZYR4QLx2foCjrq_KVhvE73FonwfCcq.lCO7NyWE9vE_0uPc', ppt: 'TBD'},
        { date: '2024-05-24', presenter: 'Jihye Kang', article: { title: 'Effects of Initial Conditions on Magnetic Reconnection in a Solar Transient', url: 'https://ui.adsabs.harvard.edu/abs/2022SoPh..297...91A/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/NxYmP_OmN_YTKFYIecV3CrLq38avus4SVNYhoW0fcM2BjQqJypaFUWK61lIv_kgB.a09O3tofnYLydxo6', ppt: 'TBD'},
        { date: '2024-05-31', presenter: 'Hwanhee Lee', article: { title: 'Modeling CME encounters at Parker Solar Probe with OSPREI: Dependence on photospheric and coronal conditions', url: 'https://www.aanda.org/articles/aa/full_html/2023/05/aa45445-22/aa45445-22.html' }, video: 'https://khu-ac.zoom.us/rec/share/-9cgxa6Kr5L7oycoG1dnAlRrcjPZSeNR-RTzbDwKxHr1kWnvn1eqjx-dnUnJ142O.4dw7d8Ox6P7B1_xV', ppt: 'TBD'},
        { date: '2024-06-14', presenter: 'Donghui Son', article: { title: 'Ideal GLM-MHD: About the entropy consistent nine-wave magnetic field divergence diminishing ideal magnetohydrodynamics equations', url: 'https://www.sciencedirect.com/science/article/pii/S0021999118301463' }, video: 'https://khu-ac.zoom.us/rec/share/mhOhl9WRtnajuNOmiLYlX56EdevHJlV43GZ3cFVIU-CeAzpDiFEyaPD0SxH4U-7o.-05zW1VquKay2W_F', ppt: 'TBD'},
        { date: '2024-06-21', presenter: 'Mingyu Jeon', article: { title: 'SuNeRF: 3D Reconstruction of the Solar EUV Corona Using Neural Radiance Fields', url: 'https://doi.org/10.3847/2041-8213/ad12d2' }, video: 'https://khu-ac.zoom.us/rec/share/nwU4AtBgJnHj9RCLwnKooSR8jHmV6nViU3JcljlRM_ABOIKZyqNZ-FBwlgou1WJO.Z6tsASTdd3Bu3tvC', ppt: 'TBD'},
        { date: '2024-07-05', presenter: 'Hyunjin Jeong', article: { title: 'Advancing interplanetary magnetohydrodynamic models through solar energetic particle modelling', url: 'https://ui.adsabs.harvard.edu/abs/2023A%26A...679A..93N/abstract' }, video: 'https://khu-ac.zoom.us/rec/share/NBo78t7k8nCCCXcatfnz2DFusXYVTjoTjZCVowCfu5gdUoynj8DLcsgryYL3nHZU.kUe4yXE6rts1RqwA', ppt: 'TBD'},
        { date: '2024-07-26', presenter: 'Kyungsun Park', article: { title: 'Direct evidence of substorm-related impulsive injections of electrons at Mercury', url: 'https://www.nature.com/articles/s41467-023-39565-4' }, video: 'https://khu-ac.zoom.us/rec/share/2XEbyM4TNBvxEy8-TtuT0FFGHy3yvJOx1ijcHDlfb-PkScb8HxxyMmyHqZ99M8nk.-9FPrc6Fd0N96T91', ppt: 'TBD'},
    
        // 2024-3rd: 29-38 (10개)
        { date: '2024-09-20', presenter: 'Yeonwoo Jang', article: { title: 'The McNish and Lincoln Solar-Activity Predictions: The Method and Its Performance', url: 'https://doi.org/10.1007/s11207-024-02266-2' }, video: 'https://khu-ac.zoom.us/rec/share/kUgjUu5iMEpinMVEzzgbPHGCg52nlPzjksjDbcnX3qZjrvnREvQg13u9VeLTAHTf.3WBXzVdJIysT66mw', ppt: 'TBD'},
        { date: '2024-09-27', presenter: 'Kyungsun Park', articles: [
            { title: 'The Twisted Configuration of the Martian Magnetotail: MAVEN Observations', url: 'https://doi.org/10.1029/2018GL077251' },
            { title: 'Oxygen Ion Energization at Mars: Comparison of MAVEN and Mars Express Observations to Global Hybrid Simulation', url: 'https://doi.org/10.1002/2017JA024884' },
        ], video: 'https://khu-ac.zoom.us/rec/share/PyN2uKNVbZynXRXjMxvrfIy-F8oGdz0EiurrktBZAE1zDyMt22dZpFY_geTMdtk0.ai4LiR_zF4nhZagx', ppt: 'https://drive.google.com/file/d/1NNCK4XZLrpU1j6RPtY9muy2f9en_1WUD/view?usp=drive_link'},
        { date: '2024-10-11', presenter: 'Jihye Kang', article: { title: 'Thermodynamic and Magnetic Topology Evolution of the X1.0 Flare on 2021 October 28 Simulated by a Data-driven Radiative Magnetohydrodynamic Model', url: 'https://iopscience.iop.org/article/10.3847/1538-4365/acc797' }, video: 'https://khu-ac.zoom.us/rec/share/M8aFX9fPSgD-lrZ6fjEbxOd_N8CyIaAYLlXSBM4rq-8Gmvp-v_azhtFig7-SCwbz.EIDCeDMsTIxmjUmr', ppt: 'TBD'},
        { date: '2024-10-25', presenter: 'Hyunjin Jeong', article: { title: 'Modeling the propagation of coronal mass ejections with COCONUT: Implementation of the regularized Biot-Savart law flux rope model', url: 'https://www.aanda.org/articles/aa/full_html/2024/03/aa47634-23/aa47634-23.html' }, video: 'https://khu-ac.zoom.us/rec/share/9JtUY2TsgCe7XOxcv4V3Pi2nrCYYMPW7_92lSiU2CARhNtzP5gTPmGxPQ5p1wGh_.teLNUBiwZZDYKD5D', ppt: 'TBD'},
        { date: '2024-11-08', presenter: 'Sibaek Yi', article: { title: 'Toroidal Miller-Turner and Soloviev coronal mass ejection models in EUHFORIA I. Implementation', url: 'https://doi.org/10.1051/0004-6361/202347794' }, video: ' https://khu-ac.zoom.us/rec/share/m-JTbaF42B2UWgUk6qG5YVvGLz1AwQDa_QbKgmEteb9vPJZiwOi70I2nu5Ya2xZB.RHwtFvK-1jqBLMpC', ppt: 'TBD'},
        { date: '2024-11-15', presenter: 'Daeil Kim',  article: { title: 'Modeling the formation and eruption of coronal structures by linking data-driven magnetofrictional and MHD simulations for AR 12673', url: 'https://doi.org/10.1051/0004-6361/202346183' }, video: 'https://khu-ac.zoom.us/rec/share/Uu6Kjhmh2jMGxGGu6gr9-MUHGz87lDSzXM-vNMpT9f_d8_2V3CS4zXAZ-F33eGNx.MFhhoc-QdrHlFaSK', ppt: 'TBD'},
        { date: '2024-11-22', presenter: 'Junmu Youn', article: { title: 'Observational Signatures of Coronal Heating in Magnetohydrodynamic Simulations without Radiation or a Lower Atmosphere', url: 'https://doi.org/10.3847/1538-4357/ac9f41' }, video: 'https://khu-ac.zoom.us/rec/share/wQYwx8Qb-irtVvu_krQh1REferHyZ0rq2T6mKoM5jZOaViKb2RosmjbMjbViYvcv.LlvlABjFoTnPWDYk', ppt: 'TBD'},
        { date: '2024-11-29', presenter: 'Donghui Son', article: { title: 'The Sun\'s differential rotation is controlled by high-latitude baroclinically unstable inertial modes', url: 'https://www.science.org/doi/10.1126/sciadv.adk5643' }, video: 'https://khu-ac.zoom.us/rec/share/FFQa2Yp61H2xO7sCPgyZ0LE1w0UD-SK2rMVBUCaagp5XBW9QMrTAUXIK6Jzx_vQ-.3K4w7EmrmTDX8If0', ppt: 'TBD'},
        { date: '2024-12-13', presenter: 'Junmo An', article: { title: 'Magnetograms underestimate even unipolar magnetic flux nearly everywhere on the solar disk', url: 'https://doi.org/10.1051/0004-6361/202450267' }, video: 'https://khu-ac.zoom.us/rec/share/jaFtuVnDYbLZvfzSbmQgIxDhoZKXT8CcbXDMzAERJqy1BIoEhTtpqbD80-pQkQcS.zXvKctR3esgpIZfV', ppt: 'TBD'},
        { date: '2024-12-20', presenter: 'Mingyu Jeon', article: { title: 'A Near-half-century Simulation of the Solar Corona', url: 'https://iopscience.iop.org/article/10.3847/2041-8213/ad1934' }, video: 'https://khu-ac.zoom.us/rec/share/nNnTokmVw4t4Q-xF2ujADwSeEb8GXgvkW467-KFdTldyAAOKTJNFvp2t-jqGOqaL.YXQGz6UGWXqe2uAA', ppt: 'TBD'},

        // 2025-1st: 39-50 (12개)
        { date: '2025-02-14', presenter: 'Daeil Kim', article: { title: 'Studying the Spheromak Rotation in Data-constrained Coronal Mass Ejection Modeling with EUHFORIA and Assessing Its Effect on the Bz Prediction', url: 'https://iopscience.iop.org/article/10.3847/1538-4365/ad0df4' }, video: 'https://khu-ac.zoom.us/rec/share/IXl9pOSfKRLkY-YvHzBOdWu8gVL-ofMn-eexgTa8V0Ieo8v9iitZNLc1vzPVtGqj._osq8XWJSXSgM86N', ppt: 'TBD'},
        { date: '2025-02-21', presenter: 'Junmu Youn', article: { title: 'The Coronal Veil', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ac3df9' }, video: 'https://khu-ac.zoom.us/rec/share/zwH2H4Gkt_ct3swucDxhegoliKYN2qBNuHojRjTAcb6WciGVEZTZkW7Vv8i0Tm4.QUJVczMCFVgOxvwN', ppt: 'TBD'},
        { date: '2025-02-28', presenter: 'Yeongmin Kang', article: { title: 'Data-driven MHD Simulation of the Formation of a Magnetic Flux Rope and an Inclined Solar Eruption', url: 'https://doi.org/10.3847/1538-4357/ad6a54' }, video: 'https://khu-ac.zoom.us/rec/share/G20O-BFdsYKLlnRUIoJ2xdjzoDZiUBSRrxmJDyQyI43gyg-Z6cSYIwUNeGU6jJn-._B1qVeDdkKROF17g', ppt: 'TBD'},
        { date: '2025-03-07', presenter: 'Sangjin Park', articles: [
            { title: 'Penumbral fine structure and driving mechanisms of large-scale flows in simulated sunspots', url: 'https://iopscience.iop.org/article/10.1088/0004-637X/729/1/5' },
            { title: 'NUMERICAL SUNSPOT MODELS: ROBUSTNESS OF PHOTOSPHERIC VELOCITY AND MAGNETIC FIELD STRUCTURE', url: 'https://iopscience.iop.org/article/10.1088/0004-637X/750/1/62' },
        ], video: 'https://khu-ac.zoom.us/rec/share/JP_JBwn2rXzXxqVRnyAJf9WEp3pSA3MAdPDzOXCJrGM6ea4lGdfLJ4VSZ4gCdoXd.XMYkZSGqfee5uwRg', ppt: 'TBD'},
        { date: '2025-03-14', presenter: 'Kyungsun Park', article: { title: 'Multispecies and Multifluid MHD Approaches for the Study of Ionospheric Escape at Mars', url: 'https://doi.org/10.1029/2017JA025117' }, video: 'https://khu-ac.zoom.us/rec/share/0P7irjW7v7Bpd3SlCi7ZhEQSCzbWGL_C56usbjBoevSU8QOvEVD-B9QSDiHLNDrm.q5Byp7l9EQvq7EMn', ppt: 'TBD'},
        { date: '2025-03-21', presenter: 'Youngjae Kim', article: { title: 'Applying the Weighted Horizontal Magnetic Gradient Method to a Simulated Flaring Active Region', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/aab891/meta' }, video: 'https://khu-ac.zoom.us/rec/share/vU-Ur-HXGsMj6ooe09QG0gJv_XF1va7xKl70Lnf-zCE0PkCGzVL4LizdJUfFriZg.8e63ke1abtdJgqun', ppt: 'TBD'},
        { date: '2025-03-28', presenter: 'Sibaek Yi', article: { title: 'A Data-constrained Model for Coronal Mass Ejections Using the Graduated Cylindrical Shell Method', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/aad3b4/meta' }, video: 'https://khu-ac.zoom.us/rec/share/mBCZNlhl2EDsr8KNl-BUFx8lSQpy5IF1JE9tpuvaVn1JxnJaG6VafFfhvApxXX_Z.w5DZwUCOf9K7Y3sS', ppt: 'TBD'},
        { date: '2025-04-04', presenter: 'Donghui Son', article: { title: 'Convective Magnetic Flux Emergence Simulations from the Deep Solar Interior to the Photosphere: Comprehensive Study of Flux Tube Twist', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ad7e1d' }, video: 'https://khu-ac.zoom.us/rec/share/oCjZN6pEldM7-yoKhkpUjXwbymMK1wOSjoLXcbit--Cvpmsfhfu7mQzGtHDYatw3.oFWSlNMsIaUJ0YQR', ppt: 'TBD'},
        { date: '2025-05-16', presenter: 'Mingyu Jeon', article: { title: 'Models and data analysis tools for the Solar Orbiter mission', url: 'https://www.aanda.org/articles/aa/full_html/2020/10/aa35305-19/aa35305-19.html' }, video: 'https://khu-ac.zoom.us/rec/share/VjuvVJkxQ8jKqlwC3sK8ode_4Ksce8h7WJfXncRaDrh8ejTaYReLUCv3_P0Nf-5Y.7hsYCO86pTOKDUS2', ppt: 'TBD' },
        { date: '2025-05-23', presenter: 'Junmo An', article: { title: 'Which Component of Solar Magnetic Field Drives the Evolution of Interplanetary Magnetic Field over the Solar Cycle?', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/acd053' }, video: 'https://khu-ac.zoom.us/rec/share/OFAfjfu7XqbZd6AJJA8P2uiQTQQ7LuIyKWiwHH27fz80NxesAAjKc4-JVNYlY2nr.WNGhrqPr87Xf6Rbe', ppt: 'TBD'},
        { date: '2025-06-13', presenter: 'Yeonwoo Jang', article: { title: 'Solar Eruptions Triggered by Flux Emergence below or near a Coronal Flux Rope', url: 'https://iopscience.iop.org/article/10.3847/1538-4357/ad1826' }, video: 'https://khu-ac.zoom.us/rec/share/nXjCpDdkOqshqFJ_kQsd27b7aqPlDROQ8hsl9I1tXPze36RojtLg-YSJvpsJg88f.IjZnNtbnsvwCBrcN', ppt: 'TBD' },
        { date: '2025-06-20', presenter: 'Jihye Kang', article: { title: 'The role of the external toroidal magnetic field on the large-angle rotation of magnetic flux ropes', url: 'https://www.aanda.org/articles/aa/full_html/2025/03/aa51543-24/aa51543-24.html' }, video: 'https://khu-ac.zoom.us/rec/share/enUtuEwwgq-PIG8IZ6_NQz-tsHsRgh6VIR9zl8FL6XEXgc6kWJobtROmUaB_OPBk.K-3iY6hTJ6yaqlar', ppt: 'TBD'},
    
        // 2025-2nd: 50-60 (11개)
        { date: '2025-09-05', presenter: 'Seungwoo Ahn', article: { title: 'Deriving the Coronal Separatrix-Web With the WSA Model', url: 'https://khu-ac.zoom.us/rec/share/qp20uyAAAEm6yhlSZ7I2fYyFU-zp34cmUZHcJ_lTUp1Xzjc3H9Dr88_BRlODxKRk.2UsfUsAM9pffhZ4Z' }, video: 'https://khu-ac.zoom.us/rec/share/IXl9pOSfKRLkY-YvHzBOdWu8gVL-ofMn-eexgTa8V0Ieo8v9iitZNLc1vzPVtGqj._osq8XWJSXSgM86N', ppt: 'TBD'},
        { date: '2025-09-12', presenter: 'Yeonwoo Jang', article: { title: 'Computation of Winding-Based Magnetic Helicity and Magnetic Winding Density for SHARP Magnetograms in Spherical Coordinates', url: 'https://link.springer.com/article/10.1007/s11207-023-02211-9' }, video: 'https://khu-ac.zoom.us/rec/share/PJUAxfIjI3jHt_1k2Yydp_LVERKE7U7qd4y5TlnrZyDzeNGPQ4Y71N1VWHskUPlP.hCl_WzNeIHONMNsV', ppt: 'TBD'},
        { date: '2025-10-10', presenter: 'Mingyu Jeon', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-10-24', presenter: 'Youngjae Kim', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-11-07', presenter: 'Sibaek Yi', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-11-14', presenter: 'Daeil Kim', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-11-21', presenter: 'Junmo An', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-11-28', presenter: 'Donghui Son', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-12-05', presenter: 'Jihye Kang', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD' },
        { date: '2025-12-12', presenter: 'Junmu Youn', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD'},
        { date: '2025-12-19', presenter: 'Sangjin Park', article: { title: 'TBD', url: 'TBD' }, video: 'TBD', ppt: 'TBD' }    
    ];
    

    // 미팅 그룹의 시작과 끝 인덱스를 명확하게 정의
    const GROUP_INDICES = {
        '2023-1st': { start: 0, end: 10 },
        '2024-1st': { start: 10, end: 21 },
        '2024-2nd': { start: 21, end: 29 },
        '2024-3rd': { start: 29, end: 39 },
        '2025-1st': { start: 39, end: 50 },
        '2025-2nd': { start: 50, end: 60 }
    };
  
    // 미팅 그룹 생성을 더 명확하고 유지보수하기 쉽게 수정
    const meetingGroups = Object.fromEntries(
        Object.entries(GROUP_INDICES).map(([key, {start, end}]) => [
            key,
            meetings.slice(start, end)
        ])
    );

    // Title case 변환 함수 추가
    function toTitleCase(str) {
        // 소문자로 변환하지 않을 특수 단어들 (약어, 단위 등)
        const specialWords = new Set(['MHD', 'TBD','CME', 'CMEs', '3D', 'EUHFORIA', 'MAVEN', 'SOHO', 'MDI', 'SDO', 'HMI', 'BBSO', 'HOW-MHD', 'WENO', 'GLM-MHD', 'SuNeRF', 'EUV', 'OSPREI', 'COCONUT']);
    
        // 항상 소문자로 유지할 단어들
        const lowercaseWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'of', 'on', 'or', 'the', 'to', 'up', 'yet']);

        return str.split(' ').map((word, index) => {
            // 특수 단어는 그대로 유지
            if (specialWords.has(word.toUpperCase())) {
                return word.toUpperCase();
            }
        
            // 첫 단어이거나 소문자로 유지할 단어가 아닌 경우
            if (index === 0 || !lowercaseWords.has(word.toLowerCase())) {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        
            return word.toLowerCase();
        }).join(' ');
    }
    
    function updateMeetings() {
        // validateMeetings(); // 유효성 검사 실행 (주석 처리)
        const today = new Date();
        const upcomingSection = document.getElementById('upcoming-meeting');
        const meetingsContainer = document.getElementById('quarters-container');
        const meetingsTableContainer = document.getElementById('meetings-table-container');

        let upcomingCardHtml = ''; // Changed variable name
        let foundUpcoming = false;

        const meetingGroups = {
            '2023-1st': meetings.slice(0, 10),
            '2024-1st': meetings.slice(10, 21),
            '2024-2nd': meetings.slice(21, 29),
            '2024-3rd': meetings.slice(29, 39),
            '2025-1st': meetings.slice(39)
        };

        // Find the next upcoming meeting
        const upcomingMeeting = meetings.find(meeting => new Date(meeting.date) >= today);

        if (upcomingMeeting) {
            foundUpcoming = true;
            let articleContent;
            if (Array.isArray(upcomingMeeting.articles)) {
                articleContent = upcomingMeeting.articles.map((article, index) => {
                    article.title = toTitleCase(article.title); // 제목 변환
                    return `<li class="article-item"><a href="${article.url}" target="_blank">${index + 1}. ${article.title}</a></li>`;
                }).join('');
                articleContent = `<ul class="article-list">${articleContent}</ul>`;
            } else if (typeof upcomingMeeting.article === 'object') {
                // Check if title or url is TBD, if so, treat as plain text
                const title = upcomingMeeting.article.title;
                const url = upcomingMeeting.article.url;

                if (title && title.toUpperCase() !== 'TBD') {
                    const formattedTitle = toTitleCase(title); // 제목 변환
                    if (url && url.toUpperCase() !== 'TBD') {
                        // Title and URL are available
                        articleContent = `<a href="${url}" target="_blank">${formattedTitle}</a>`; // Render as link
                    } else {
                        // Title is available, URL is TBD
                        articleContent = `<span>${formattedTitle}</span>`; // Render title as span
                    }
                } else {
                    // Title is TBD (or missing)
                    articleContent = `<span>TBD</span>`; // Render TBD as span
                }
            } else {
                // Wrap TBD or other plain text in a span for consistent styling
                articleContent = `<span>${upcomingMeeting.article || 'TBD'}</span>`; 
            }

            upcomingCardHtml = `\n                <div class=\"upcoming-card\">\n                    <h2 class=\"card-title\">📚 Upcoming Meeting</h2>\n                    <div class=\"card-body\">\n                        <p class=\"card-item\"><strong class=\"item-label\">🗓️ Date:</strong> <span class=\"item-value\">${upcomingMeeting.date}</span></p>\n                        <p class=\"card-item\"><strong class=\"item-label\">⏰ Time:</strong> <span class=\"item-value\">10:30 AM</span></p>\n                        <p class=\"card-item\"><strong class=\"item-label\">🎙️ Presenter:</strong> <span class=\"item-value\">${upcomingMeeting.presenter}</span></p>\n                        <p class=\"card-item article-section\">\n                            <strong class=\"item-label\">🔖 Article(s):</strong>\n                            <div class=\"item-value\">${articleContent}</div>\n                        </p>\n                        <p class=\"card-item zoom-link\"><strong class=\"item-label\">🖥️ Zoom:</strong> <a href=\"https://khu-ac.zoom.us/j/89012045054\" target=\"_blank\" class=\"zoom-button\">Join Meeting</a></p>\n                    </div>\n                </div>\n            `;
        } else {
           upcomingCardHtml = `
                <div class="upcoming-card upcoming-card-empty">
                    <h2 class="card-title">📚 Upcoming Meeting</h2>
                    <p class="card-body">No more scheduled meetings.</p>
                </div>
            `;
        }

        upcomingSection.innerHTML = upcomingCardHtml; // Update the section with card HTML

        meetingsContainer.innerHTML = '';
        Object.keys(meetingGroups).forEach(key => {
            const button = document.createElement('button');
            button.textContent = key;
            button.classList.add('quarter-button');
            button.addEventListener('click', () => showMeetings(key, meetingGroups[key]));
            meetingsContainer.appendChild(button);
        });

        // 가장 최근 미팅 그룹을 기본으로 표시
        const latestGroup = Object.keys(meetingGroups)[Object.keys(meetingGroups).length - 1];
        showMeetings(latestGroup, meetingGroups[latestGroup]);
    }

    function showMeetings(groupName, meetings) {
        const meetingsTableContainer = document.getElementById('meetings-table-container');
        const startDate = meetings[0].date;
        const endDate = meetings[meetings.length - 1].date;
        
        let tableHtml = `
            <h3>${startDate} ~ ${endDate}</h3>
            <table>
                <thead>
                    <tr>
                        <th>🗓️ Date</th>
                        <th>⏰ Time</th>
                        <th>🎙️ Presenter</th>
                        <th>🔖 Article</th>
                        <th>🔗 Materials</th>
                    </tr>
                </thead>
                <tbody>
        `;

        meetings.forEach(meeting => {
            let articleContent;
            
            if (Array.isArray(meeting.articles)) {
                articleContent = meeting.articles.map((article, index) => 
                    `${index + 1}. <a href="${article.url}" target="_blank">${article.title}</a>`
                ).join('<br>');
            } else if (typeof meeting.article === 'object') {
                articleContent = `<a href="${meeting.article.url}" target="_blank">${meeting.article.title}</a>`;
            } else {
                articleContent = meeting.article || 'TBD';
            }
    
            const videoContent = meeting.video === 'TBD' ? 'TBD' : `<a href="${meeting.video}" target="_blank">Video</a>`;
            const pptContent = meeting.ppt ? (meeting.ppt === 'TBD' ? 'TBD' : `<a href="${meeting.ppt}" target="_blank">PPT</a>`) : 'N/A';
    
            tableHtml += `
                <tr>
                    <td data-label="Date"> ${meeting.date}</td>
                    <td data-label="Time"> 10:30 AM</td>
                    <td data-label="Presenter"> ${meeting.presenter}</td>
                    <td data-label="Article"> ${articleContent}</td>
                    <td data-label="Materials"> ${videoContent} | ${pptContent}</td>
                </tr>
            `;
        });

        meetingsTableContainer.innerHTML = tableHtml;

        // 선택된 그룹 버튼 스타일 변경
        document.querySelectorAll('.quarter-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.textContent === groupName) {
                btn.classList.add('active');
            }
        });
    }

    updateMeetings();
    // setInterval 제거됨: 페이지 로드 시 한 번 업데이트하는 것으로 충분


    // --- Navbar Mobile Menu Toggle --- 
    const mobileMenu = document.getElementById('mobile-menu');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (mobileMenu && navbarMenu) {
      mobileMenu.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active'); // For the 'X' animation
      });

      // Close mobile menu when a link is clicked
      navbarMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          if (navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
          }
        });
      });
    }
    // --- End Navbar Mobile Menu Toggle --- 


    // 스크롤 시 네비게이션 바 스타일 변경 (기존 코드 제거 - CSS로 처리)
    // window.addEventListener('scroll', function() {
    //     const navbar = document.querySelector('.navbar');
    //     if (window.scrollY > 50) {
    //         navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    //     } else {
    //         navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    //     }
    // });
});