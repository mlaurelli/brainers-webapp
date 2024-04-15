import { useEffect, useState } from 'react';
import {
  User,
  Search,
  ChevronLeft,
  Phone,
  Video,
  PlusCircle,
  Trash2,
  Slash,
  MoreVertical,
  ChevronsLeft,
  Plus,
  Pause,
  MicOff,
  VideoOff,
  UserPlus,
  CameraOff,
  Volume2,
  X,
} from 'react-feather';
import {
  Button,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { Download, RotateCw } from 'react-feather';
import CustomChat from './customChat';
import MessageInput from './messageInput';
import { Tooltip } from 'react-tippy';
import { useContext } from 'react';
import ChatContext from '../../helpers/chatContext';
import Link from 'next/link';

const Chat = (props) => {
  const [search, setSearch] = useState(false);
  const [VolumOnOff, setVolumOnOff] = useState(false);
  const [callModal, setCallModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [quickAction, setQuickAction] = useState(false);
  const [confercall, setConfercall] = useState(false);
  const [confvideocall, setConfvideocall] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [blockModal, setBlockModal] = useState(false);
  const { OpenAppSidebar, toggleSmallSide } = useContext(ChatContext);
  const [addMember, setaddMember] = useState(false);

  const toggleConfercall = () => {
    setConfercall(!confercall);
  };
  const toggleConfvideocall = () => {
    setConfvideocall(!confvideocall);
  };

  return (
      <CustomChat
        quickAction={quickAction}
        setQuickAction={setQuickAction}
        OpenAppSidebar={OpenAppSidebar}
        toggleSmallSide={toggleSmallSide}
        timeValues={props.timeValues}
      />
  )
}

export default Chat;
