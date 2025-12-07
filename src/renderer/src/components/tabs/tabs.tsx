import * as React from "react";
import Box from "@mui/material/Box";
import { IconButton, Tabs as MuiTabs } from "@mui/material";
import { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "@emotion/styled";
import { ModalCreateTab } from "./components/modal-create-tab";
import { useModal } from "@renderer/shared/hooks/use-modal";
import { SubscribeTabsContext } from "@renderer/context/tabs";
import { useAnchourElement } from "@renderer/shared/hooks/use-anchor-element";
import { Tab } from "./components/tab";
import { ModalDelete } from "../modal-delete";
import { ModifyTabModal } from "./components/modify-tab-modal";
import type { Tab as TabType } from "@renderer/entities/menu-list";
import { defaultTab } from "./constants";

export const StyledIconButton = styled(IconButton)`
  align-self: anchor-center;
`;

export const Tabs = () => {
  const { open, handleClose, handleOpen } = useModal();
  const { tabs, deleteById, update, handleSetActiveTab, activeTab } =
    useContext(SubscribeTabsContext);
  const [value, setValue] = useState(activeTab?.id || defaultTab.id);
  const [currentTab, setCurrentTab] = useState<TabType | null>(
    activeTab || defaultTab
  );

  const {
    open: openSettingsMenu,
    handleClick,
    handleClose: handleCloseSettingsMenu,
    anchorEl,
  } = useAnchourElement();

  const {
    open: openDeleteModal,
    handleClose: handleCloseDeleteModal,
    handleOpen: handleOpenDeleteModal,
  } = useModal();

  const {
    open: openChangeModal,
    handleClose: handleCloseChangeModal,
    handleOpen: handleOpenChangeModal,
  } = useModal();

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeTab = (
    event: React.MouseEvent<HTMLDivElement>,
    tab: TabType
  ) => {
    handleClick(
      event as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
    );
    setCurrentTab(tab);
  };

  const handleDeleteTab = () => {
    deleteById(currentTab?.id as string);
    handleCloseDeleteModal();
  };

  const handleUpdateTab = (tab: TabType) => {
    update(tab);
    handleCloseDeleteModal();
  };

  const menuItems = [
    {
      buttonName: "Удалить",
      onClick: () => {
        handleOpenDeleteModal();
      },
    },
    {
      buttonName: "Изменить",
      onClick: () => {
        handleOpenChangeModal();
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs
          onChange={handleChange}
          value={value}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            key={defaultTab.id}
            value={defaultTab.id}
            label={defaultTab.name}
            anchorEl={anchorEl}
            menuItems={menuItems}
            open={openSettingsMenu}
            handleClose={handleCloseSettingsMenu}
            onClick={() => handleSetActiveTab(defaultTab)}
          />
          {tabs?.map(({ name, id }) => (
            <Tab
              key={id}
              value={id}
              label={name}
              anchorEl={anchorEl}
              menuItems={menuItems}
              open={openSettingsMenu}
              handleClose={handleCloseSettingsMenu}
              onClick={() => {
                handleSetActiveTab({ id, name });
                setCurrentTab({ id, name });
              }}
              onContextMenu={(event) => handleChangeTab(event, { id, name })}
            />
          ))}
          <StyledIconButton onClick={handleOpen}>
            <AddIcon fontSize="inherit" />
          </StyledIconButton>
        </MuiTabs>
        <ModalCreateTab open={open} handleClose={handleClose} />
        <ModalDelete
          title={`Удалить вкладку ${currentTab?.name}`}
          description={`Вы уверены, что хотите удалить вкладку ${currentTab?.name}?`}
          open={openDeleteModal}
          handleClose={handleCloseDeleteModal}
          handleApply={handleDeleteTab}
        />
        {currentTab && (
          <ModifyTabModal
            tab={currentTab}
            open={openChangeModal}
            handleClose={handleCloseChangeModal}
            callback={handleUpdateTab}
          />
        )}
      </Box>
    </Box>
  );
};
