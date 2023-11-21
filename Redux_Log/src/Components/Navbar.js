import React from 'react'
import { Link } from "react-router-dom";
import { Box, Flex } from '@chakra-ui/react'
import { IconName } from "react-icons/ai";
import {AiFillDashboard } from "react-icons/ai" 
import {FaGraduationCap} from "react-icons/fa"
import {AiFillFolderOpen} from "react-icons/ai"
import {HiQuestionMarkCircle} from "react-icons/hi"
import {GiStarKey} from "react-icons/gi"
import {MdLibraryBooks} from "react-icons/md"
import {FaUserAlt} from "react-icons/fa";
import "./Style/navbar.css"
import { useBoolean } from '@chakra-ui/react'
const Navbar = () => {
    const [fog, setFog]=useBoolean(false)
  return (
    <Box>
      <Box>
        <Box pas='fixed' top="1rem" right="1rem" align="center" >
            <Flex className="navbar" display={{base:"none" , md:"flex"}} >
                <img className='itax' src='ITAX.svg' />
            
                <Link className='link' component={Link} to={"/home"}>
                    <Box>
                    <AiFillDashboard/>
                    DASHBOARD
                    </Box>
                </Link>
                <Link className='link' to={"/"}>
                    <Box>
                        <FaUserAlt/>
                        LOGIN
                    </Box>
                </Link>
            </Flex>
            <Box>

            </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
